import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Plus, Fuel, Wrench, FileText, Search, Filter } from "lucide-react"
import { useData } from "@/src/context/DataContext"

export function Kosten() {
  const navigate = useNavigate()
  const { kosten, fahrzeuge } = useData()

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<"Alle" | "fix" | "variabel">("Alle")

  const filteredKosten = kosten.filter(k => {
    const car = fahrzeuge.find(c => c.id === k.carId)?.name || ""
    const searchLower = searchTerm.toLowerCase()
    
    const matchesSearch = 
      k.category.toLowerCase().includes(searchLower) ||
      car.toLowerCase().includes(searchLower) ||
      (k.notes && k.notes.toLowerCase().includes(searchLower))

    const matchesType = typeFilter === "Alle" || k.type === typeFilter

    return matchesSearch && matchesType
  })

  // Sort by date descending
  filteredKosten.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const sumFix = kosten.filter(k => k.type === 'fix').reduce((sum, k) => sum + parseFloat(k.amount || "0"), 0)
  const sumVar = kosten.filter(k => k.type === 'variabel').reduce((sum, k) => sum + parseFloat(k.amount || "0"), 0)
  const sumTotal = sumFix + sumVar

  const getIconForCategory = (category: string) => {
    if (category === 'Sprit') return Fuel
    if (category === 'Werkstatt') return Wrench
    return FileText
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kosten</h1>
        <Button onClick={() => navigate("/kosten/neu")}>
          <Plus className="mr-2 h-4 w-4" />
          Neue Kosten erfassen
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Fixkosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{sumFix.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-gray-500 mt-1">Leasing, Versicherung, Steuer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Variable Kosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{sumVar.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-gray-500 mt-1">Sprit, Werkstatt, Reinigung</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Gesamtkosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{sumTotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-red-700 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Suchen nach Kategorie, Fahrzeug..." 
              className="pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={typeFilter === "Alle" ? "secondary" : "outline"} 
              onClick={() => setTypeFilter("Alle")}
              size="sm"
            >
              Alle
            </Button>
            <Button 
              variant={typeFilter === "fix" ? "secondary" : "outline"} 
              onClick={() => setTypeFilter("fix")}
              size="sm"
            >
              Fixkosten
            </Button>
            <Button 
              variant={typeFilter === "variabel" ? "secondary" : "outline"} 
              onClick={() => setTypeFilter("variabel")}
              size="sm"
            >
              Variable Kosten
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kostenübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Fahrzeug</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKosten.map((row) => {
                const Icon = getIconForCategory(row.category)
                const carName = fahrzeuge.find(c => c.id === row.carId)?.name || "Unbekannt"
                return (
                  <TableRow key={row.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/kosten/${row.id}/bearbeiten`)}>
                    <TableCell className="text-sm text-gray-900">{new Date(row.date).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{row.category}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{row.notes || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{carName}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-gray-900">
                      {parseFloat(row.amount || "0").toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </TableCell>
                  </TableRow>
                )
              })}
              {filteredKosten.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Keine Kosten gefunden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
