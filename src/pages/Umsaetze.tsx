import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Download, Upload, Car, Smartphone, TrendingUp } from "lucide-react"
import { useData } from "@/src/context/DataContext"

function formatDateDisplay(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}

export function Umsaetze() {
  const { fahrten, plattformUmsaetze, fahrer, fahrzeuge } = useData()
  const [activeTab, setActiveTab] = useState<"uebersicht" | "fahrten" | "plattform">("uebersicht")

  // Calculate Umsätze aus Fahrten
  const umsatzFahrten = fahrten.filter(f => f.status === "erledigt" && f.price)
  const sumFahrten = umsatzFahrten.reduce((acc, curr) => acc + parseFloat(curr.price || "0"), 0)

  // Use real Plattformumsätze from DataContext
  const sumPlattform = plattformUmsaetze.reduce((acc, curr) => acc + curr.amount, 0)

  const sumTotal = sumFahrten + sumPlattform

  const getDriverName = (id: string) => fahrer.find(d => d.id === id)?.name || "Unbekannt"
  const getCarName = (id: string) => fahrzeuge.find(c => c.id === id)?.name || "Unbekannt"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Umsätze</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Plattform-Import
          </Button>
        </div>
      </div>

      <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 max-w-md">
        <button
          onClick={() => setActiveTab("uebersicht")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            activeTab === "uebersicht" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Übersicht
        </button>
        <button
          onClick={() => setActiveTab("fahrten")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            activeTab === "fahrten" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Eigene Fahrten
        </button>
        <button
          onClick={() => setActiveTab("plattform")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            activeTab === "plattform" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Plattformen
        </button>
      </div>

      {activeTab === "uebersicht" && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-gray-500">Umsatz Eigene Fahrten</CardTitle>
                <Car className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{sumFahrten.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</div>
                <p className="text-xs text-gray-500 mt-1">Aus {umsatzFahrten.length} abgerechneten Fahrten</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-gray-500">Umsatz Plattformen</CardTitle>
                <Smartphone className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{sumPlattform.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</div>
                <p className="text-xs text-gray-500 mt-1">Aus {plattformUmsaetze.length} Importen</p>
              </CardContent>
            </Card>
            <Card className="bg-brand-50 border-brand-200">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-brand-800">Gesamtumsatz</CardTitle>
                <TrendingUp className="h-4 w-4 text-brand-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-900">{sumTotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</div>
                <p className="text-xs text-brand-700 mt-1">Laufender Monat</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "fahrten" && (
        <Card>
          <CardHeader>
            <CardTitle>Umsätze aus eigenen Fahrten</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Fahrttyp</TableHead>
                  <TableHead>Fahrer</TableHead>
                  <TableHead>Fahrzeug</TableHead>
                  <TableHead>Quelle</TableHead>
                  <TableHead className="text-right">Betrag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {umsatzFahrten.length > 0 ? (
                  umsatzFahrten.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-sm text-gray-900">{formatDateDisplay(row.date)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{row.type}</TableCell>
                      <TableCell className="text-sm text-gray-600">{getDriverName(row.driverId)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{getCarName(row.carId)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Eigene Fahrt</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900">{parseFloat(row.price || "0").toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                      Keine umsatzrelevanten Fahrten gefunden.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "plattform" && (
        <Card>
          <CardHeader>
            <CardTitle>Plattformumsätze (Mock)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Fahrer</TableHead>
                  <TableHead>Fahrzeug</TableHead>
                  <TableHead>Quelle</TableHead>
                  <TableHead className="text-right">Betrag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plattformUmsaetze.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-sm text-gray-900">{formatDateDisplay(row.date)}</TableCell>
                    <TableCell className="text-sm text-gray-600">{getDriverName(row.driverId)}</TableCell>
                    <TableCell className="text-sm text-gray-600">{getCarName(row.carId)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{row.source}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-gray-900">{row.amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
