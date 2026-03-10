import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Plus, Users } from "lucide-react"
import { useData } from "@/src/context/DataContext"

export function Fahrer() {
  const navigate = useNavigate()
  const { fahrer, fahrten, fahrzeuge, plattformUmsaetze } = useData()

  const driverStats = fahrer.map(driver => {
    const driverFahrten = fahrten.filter(f => f.driverId === driver.id)
    const completedFahrten = driverFahrten.filter(f => f.status === 'erledigt')
    
    const ownRevenue = completedFahrten
      .filter(f => f.price)
      .reduce((sum, f) => sum + parseFloat(f.price || "0"), 0)

    const platformRevenue = plattformUmsaetze
      .filter(p => p.driverId === driver.id)
      .reduce((sum, p) => sum + p.amount, 0)

    const totalRevenue = ownRevenue + platformRevenue

    const defaultCar = fahrzeuge.find(c => c.id === driver.defaultCarId)

    let perf = "Niedrig"
    if (totalRevenue > 4000) perf = "Hoch"
    else if (totalRevenue > 2000) perf = "Mittel"

    return {
      ...driver,
      trips: completedFahrten.length,
      revenue: totalRevenue,
      carName: defaultCar ? defaultCar.name : "-",
      perf
    }
  })

  const activeDriversCount = fahrer.filter(d => d.status === 'aktiv').length
  const totalRevenueAll = driverStats.reduce((sum, d) => sum + d.revenue, 0)
  const totalTripsAll = driverStats.reduce((sum, d) => sum + d.trips, 0)

  const avgRevenue = fahrer.length > 0 ? totalRevenueAll / fahrer.length : 0
  const avgTrips = fahrer.length > 0 ? Math.round(totalTripsAll / fahrer.length) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrer</h1>
        <Button onClick={() => navigate("/fahrer/neu")}>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Fahrer
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Aktive Fahrer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{activeDriversCount}</div>
            <p className="text-xs text-brand-600 mt-1">Alle im Einsatz</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ø Umsatz pro Fahrer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{avgRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ø Fahrten pro Fahrer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{avgTrips}</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fahrer Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stammfahrzeug</TableHead>
                <TableHead className="text-right">Fahrten</TableHead>
                <TableHead className="text-right">Erwirtschafteter Umsatz</TableHead>
                <TableHead className="text-right">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {driverStats.map((driver) => (
                <TableRow key={driver.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/fahrer/${driver.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <Users className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{driver.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={driver.status === "aktiv" ? "success" : "default"}>
                      {driver.status === "aktiv" ? "Aktiv" : "Inaktiv"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{driver.carName}</TableCell>
                  <TableCell className="text-right text-sm text-gray-600">{driver.trips}</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">
                    {driver.revenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={driver.perf === "Hoch" ? "success" : driver.perf === "Mittel" ? "warning" : "default"}>
                      {driver.perf}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {driverStats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Keine Fahrer gefunden.
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
