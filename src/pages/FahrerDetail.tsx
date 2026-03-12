import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Users, Phone, Mail, Car, TrendingUp, AlertCircle, Edit } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Badge } from "@/src/components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { useData } from "@/src/context/DataContext"

export function FahrerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getFahrer, fahrten, fahrzeuge, plattformUmsaetze } = useData()

  const fahrer = getFahrer(id || "")

  if (!fahrer) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Fahrer nicht gefunden</h2>
        <Button onClick={() => navigate("/fahrer")}>Zurück zur Übersicht</Button>
      </div>
    )
  }

  const driverFahrten = fahrten.filter(f => f.driverId === fahrer.id)
  const completedFahrten = driverFahrten.filter(f => f.status === 'erledigt')
  
  const ownRevenue = completedFahrten
    .filter(f => f.price)
    .reduce((sum, f) => sum + parseFloat(f.price || "0"), 0)

  const driverPlattform = plattformUmsaetze.filter(p => p.driverId === fahrer.id)
  const platformRevenue = driverPlattform.reduce((sum, p) => sum + p.amount, 0)

  const totalRevenue = ownRevenue + platformRevenue

  const defaultCar = fahrzeuge.find(c => c.id === fahrer.defaultCarId)

  // Get unique cars driven by this driver
  const drivenCarIds = Array.from(new Set(driverFahrten.map(f => f.carId)))
  const drivenCars = drivenCarIds.map(carId => fahrzeuge.find(c => c.id === carId)).filter(Boolean)

  let perf = "Niedrig"
  if (totalRevenue > 4000) perf = "Hoch"
  else if (totalRevenue > 2000) perf = "Mittel"

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/fahrer")} className="text-gray-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Users className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{fahrer.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={fahrer.status === "aktiv" ? "success" : "default"}>
                  {fahrer.status === "aktiv" ? "Aktiv" : "Inaktiv"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(`/fahrer/${fahrer.id}/bearbeiten`)}>
            <Edit className="mr-2 h-4 w-4" />
            Bearbeiten
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Fahrten (Erledigt)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{completedFahrten.length}</div>
            <p className="text-xs text-gray-500 mt-1">Von {driverFahrten.length} gesamt</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Umsatz (Eigene)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{ownRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Umsatz (Plattform)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{platformRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
          </CardContent>
        </Card>
        <Card className="bg-brand-50 border-brand-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-brand-800">Gesamtumsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-900">
              {totalRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stammdaten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              {fahrer.phone || "Keine Telefonnummer"}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Mail className="h-4 w-4 text-gray-400" />
              {fahrer.email || "Keine E-Mail"}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500">Notizen</p>
              <p className="text-sm text-gray-900 mt-1">{fahrer.notes || "-"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance & Fahrzeuge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Performance-Einstufung</p>
                <div className="mt-1">
                  <Badge variant={perf === "Hoch" ? "success" : perf === "Mittel" ? "warning" : "default"}>
                    {perf}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Car className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Stammfahrzeug</p>
                <p className="text-sm text-gray-900 mt-1">{defaultCar ? defaultCar.name : "Keines zugewiesen"}</p>
              </div>
            </div>
            {drivenCars.length > 0 && (
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-gray-400 mt-0.5 opacity-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Gefahrene Fahrzeuge</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {drivenCars.map(c => (
                      <Badge key={c?.id} variant="outline">{c?.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Letzte Fahrten</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Fahrzeug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Preis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {driverFahrten.slice(0, 10).map(f => {
                const car = fahrzeuge.find(c => c.id === f.carId)
                return (
                  <TableRow key={f.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/fahrten/${f.id}`)}>
                    <TableCell className="text-sm text-gray-900">{new Date(f.date).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell className="text-sm text-gray-600">{f.type}</TableCell>
                    <TableCell className="text-sm text-gray-600">{car?.name || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={f.status === "erledigt" ? "success" : f.status === "geplant" ? "warning" : "default"}>
                        {f.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-gray-900">
                      {f.price ? `${parseFloat(f.price).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : "-"}
                    </TableCell>
                  </TableRow>
                )
              })}
              {driverFahrten.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">Keine Fahrten erfasst.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
