import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Search, Filter, Calendar, X } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { useData } from "@/src/context/DataContext"

function formatDateDisplay(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}

function formatShortDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

export function Fahrten() {
  const navigate = useNavigate()
  const { fahrten, fahrer, fahrzeuge } = useData()
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Alle")
  const [dateFrom, setDateFrom] = useState("2026-03-01")
  const [dateTo, setDateTo] = useState("2026-03-31")

  // Popover States
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(false)

  // Click outside handlers
  const filterRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter Logic
  const filteredFahrten = fahrten.filter(fahrt => {
    const driver = fahrer.find(d => d.id === fahrt.driverId)?.name || ""
    const car = fahrzeuge.find(c => c.id === fahrt.carId)?.name || ""

    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      driver.toLowerCase().includes(searchLower) ||
      car.toLowerCase().includes(searchLower) ||
      fahrt.from.toLowerCase().includes(searchLower) ||
      fahrt.to.toLowerCase().includes(searchLower) ||
      fahrt.type.toLowerCase().includes(searchLower) ||
      (fahrt.notes && fahrt.notes.toLowerCase().includes(searchLower))

    const matchesStatus = statusFilter === "Alle" || fahrt.status === statusFilter.toLowerCase()

    const fahrtDate = new Date(fahrt.date)
    const from = new Date(dateFrom)
    const to = new Date(dateTo)
    // Set hours to 0 to ensure inclusive date matching
    from.setHours(0, 0, 0, 0)
    to.setHours(23, 59, 59, 999)
    const matchesDate = fahrtDate >= from && fahrtDate <= to

    return matchesSearch && matchesStatus && matchesDate
  })

  // Sort by date descending
  filteredFahrten.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrten</h1>
        <Button onClick={() => navigate('/fahrten/neu')}>
          <Plus className="mr-2 h-4 w-4" />
          Neue Fahrt
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Suchen nach Fahrer, Fahrzeug, Ort..." 
              className="pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="relative" ref={filterRef}>
            <Button 
              variant="outline" 
              className="text-gray-600 shrink-0"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter {statusFilter !== "Alle" && <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">{statusFilter}</Badge>}
            </Button>
            
            {isFilterOpen && (
              <div className="absolute top-full mt-2 left-0 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-10 p-2">
                <div className="text-xs font-semibold text-gray-500 mb-2 px-2 uppercase tracking-wider">Status</div>
                <div className="space-y-1">
                  {["Alle", "Geplant", "Erledigt", "Storniert"].map(status => (
                    <button
                      key={status}
                      className={`w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${statusFilter === status ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => {
                        setStatusFilter(status)
                        setIsFilterOpen(false)
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto relative" ref={dateRef}>
          <Button 
            variant="outline" 
            className="w-full sm:w-[250px] justify-start text-left font-normal bg-white text-gray-700 shadow-sm"
            onClick={() => setIsDateOpen(!isDateOpen)}
          >
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span>{formatShortDate(dateFrom)} - {formatShortDate(dateTo)}</span>
          </Button>

          {isDateOpen && (
            <div className="absolute top-full mt-2 right-0 w-72 rounded-md border border-gray-200 bg-white shadow-lg z-10 p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Von Datum</label>
                  <Input 
                    type="date" 
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bis Datum</label>
                  <Input 
                    type="date" 
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => setIsDateOpen(false)}>
                  Anwenden
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum / Zeit</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Von / Nach</TableHead>
              <TableHead>Fahrer</TableHead>
              <TableHead>Fahrzeug</TableHead>
              <TableHead className="text-right">Preis</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFahrten.length > 0 ? (
              filteredFahrten.map((fahrt) => {
                const driverName = fahrer.find(d => d.id === fahrt.driverId)?.name || "Unbekannt"
                const carName = fahrzeuge.find(c => c.id === fahrt.carId)?.name || "Unbekannt"
                return (
                  <TableRow key={fahrt.id} className="cursor-pointer" onClick={() => navigate(`/fahrten/${fahrt.id}`)}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{formatDateDisplay(fahrt.date)}</div>
                      <div className="text-xs text-gray-500">{fahrt.time}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal text-gray-600 bg-gray-50">
                        {fahrt.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{fahrt.from}</div>
                      <div className="text-xs text-gray-500">nach {fahrt.to}</div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{driverName}</TableCell>
                    <TableCell className="text-sm text-gray-600">{carName}</TableCell>
                    <TableCell className="text-right font-medium text-gray-900">
                      {fahrt.price ? `${parseFloat(fahrt.price).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : (
                        fahrt.status === 'erledigt' ? (
                          <span className="text-amber-600 text-xs flex items-center justify-end gap-1">
                            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                            Preis fehlt
                          </span>
                        ) : "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          fahrt.status === "erledigt" ? "success" : 
                          fahrt.status === "geplant" ? "warning" : "default"
                        }
                      >
                        {fahrt.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                  Keine Fahrten für die ausgewählten Filter gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
