import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Plus, Car } from "lucide-react"
import { useData } from "@/src/context/DataContext"

export function Fahrzeuge() {
  const navigate = useNavigate()
  const { fahrzeuge, fahrten, kosten, plattformUmsaetze } = useData()

  // Calculate stats per vehicle
  const vehicleStats = fahrzeuge.map(vehicle => {
    // Revenue from own trips
    const ownRevenue = fahrten
      .filter(f => f.carId === vehicle.id && f.status === 'erledigt' && f.price)
      .reduce((sum, f) => sum + parseFloat(f.price || "0"), 0)

    // Revenue from platforms
    const platformRevenue = plattformUmsaetze
      .filter(p => p.carId === vehicle.id)
      .reduce((sum, p) => sum + p.amount, 0)

    const totalRevenue = ownRevenue + platformRevenue

    // Costs
    const totalCosts = kosten
      .filter(k => k.carId === vehicle.id)
      .reduce((sum, k) => sum + parseFloat(k.amount || "0"), 0)

    const profit = totalRevenue - totalCosts
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0

    return {
      ...vehicle,
      revenue: totalRevenue,
      costs: totalCosts,
      profit,
      margin
    }
  })

  const activeVehiclesCount = fahrzeuge.filter(v => v.status === 'aktiv').length
  
  const totalRevenueAll = vehicleStats.reduce((sum, v) => sum + v.revenue, 0)
  const totalCostsAll = vehicleStats.reduce((sum, v) => sum + v.costs, 0)
  const totalProfitAll = totalRevenueAll - totalCostsAll

  const avgRevenue = fahrzeuge.length > 0 ? totalRevenueAll / fahrzeuge.length : 0
  const avgCosts = fahrzeuge.length > 0 ? totalCostsAll / fahrzeuge.length : 0
  const avgProfit = fahrzeuge.length > 0 ? totalProfitAll / fahrzeuge.length : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrzeuge</h1>
        <Button onClick={() => navigate("/fahrzeuge/neu")}>
          <Plus className="mr-2 h-4 w-4" />
          Neues Fahrzeug
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Aktive Fahrzeuge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{activeVehiclesCount}</div>
            <p className="text-xs text-brand-600 mt-1">Alle im Einsatz</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ø Umsatz pro Fzg.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{avgRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ø Kosten pro Fzg.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{avgCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-50 border-brand-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-brand-800">Ø Gewinn pro Fzg.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${avgProfit >= 0 ? 'text-brand-900' : 'text-red-600'}`}>
              {avgProfit.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-brand-700 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fahrzeugübersicht & Profitabilität</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kennzeichen</TableHead>
                <TableHead>Modell</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Umsatz</TableHead>
                <TableHead className="text-right">Kosten</TableHead>
                <TableHead className="text-right">Gewinn</TableHead>
                <TableHead className="text-right">Marge</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleStats.map((car) => (
                <TableRow key={car.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/fahrzeuge/${car.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                        <Car className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{car.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{car.brand} {car.model}</TableCell>
                  <TableCell>
                    <Badge variant={car.status === "aktiv" ? "success" : "default"}>
                      {car.status === "aktiv" ? "Aktiv" : "Inaktiv"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-600">
                    {car.revenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-600">
                    {car.costs.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${car.profit >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                    {car.profit.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell className={`text-right text-sm ${car.margin >= 0 ? 'text-gray-600' : 'text-red-600'}`}>
                    {car.margin.toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
              {vehicleStats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Keine Fahrzeuge gefunden.
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
