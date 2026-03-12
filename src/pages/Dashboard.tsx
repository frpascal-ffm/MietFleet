import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Badge } from "@/src/components/ui/Badge"
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Car, Euro, Users } from "lucide-react"
import { useData } from "@/src/context/DataContext"
import { useNavigate } from "react-router-dom"

export function Dashboard() {
  const { fahrten, kosten, plattformUmsaetze, fahrzeuge } = useData()
  const navigate = useNavigate()

  // Calculate fahrten without price
  const fahrtenOhnePreis = fahrten.filter(f => f.status === "erledigt" && !f.price).length

  // Calculate Kosten ohne Fahrzeug
  const kostenOhneFahrzeug = kosten.filter(k => !k.carId).length

  // Calculate Gesamtumsatz (Eigene + Plattform)
  const ownRevenue = fahrten
    .filter(f => f.status === 'erledigt' && f.price)
    .reduce((sum, f) => sum + parseFloat(f.price || "0"), 0)
  
  const platformRevenue = plattformUmsaetze.reduce((sum, p) => sum + p.amount, 0)
  const gesamtUmsatz = ownRevenue + platformRevenue

  // Calculate Gesamtkosten
  const gesamtKosten = kosten.reduce((sum, k) => sum + parseFloat(k.amount || "0"), 0)

  // Calculate Gewinn
  const gewinn = gesamtUmsatz - gesamtKosten

  // Calculate Gewinn pro Fahrzeug
  const activeCars = fahrzeuge.filter(c => c.status === 'aktiv')
  const gewinnProFahrzeug = activeCars.length > 0 ? gewinn / activeCars.length : 0

  // Calculate Top Fahrzeuge
  const carStats = fahrzeuge.map(car => {
    const carFahrten = fahrten.filter(f => f.carId === car.id && f.status === 'erledigt')
    const carOwnRev = carFahrten.reduce((sum, f) => sum + parseFloat(f.price || "0"), 0)
    const carPlatRev = plattformUmsaetze.filter(p => p.carId === car.id).reduce((sum, p) => sum + p.amount, 0)
    const carRevenue = carOwnRev + carPlatRev
    const carKosten = kosten.filter(k => k.carId === car.id).reduce((sum, k) => sum + parseFloat(k.amount || "0"), 0)
    const carProfit = carRevenue - carKosten

    return {
      id: car.id,
      name: car.name,
      type: car.model || "Unbekannt",
      profit: carProfit,
    }
  })

  // Sort by profit descending and take top 5
  const topCars = carStats.sort((a, b) => b.profit - a.profit).slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-gray-500">Laufender Monat</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Gesamtumsatz</CardTitle>
            <Euro className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{gesamtUmsatz.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-gray-500 mt-1">
              Eigene Fahrten & Plattformen
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Gesamtkosten</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{gesamtKosten.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <p className="text-xs text-gray-500 mt-1">
              Fixe & Variable Kosten
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Gewinn</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${gewinn >= 0 ? 'text-brand-600' : 'text-red-600'}`}>
              {gewinn.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Umsatz abzüglich Kosten
            </p>
          </CardContent>
        </Card>
        <Card className="border-brand-200 bg-brand-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-800">Ø Gewinn pro Fahrzeug</CardTitle>
            <Car className="h-4 w-4 text-brand-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${gewinnProFahrzeug >= 0 ? 'text-brand-900' : 'text-red-900'}`}>
              {gewinnProFahrzeug.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-brand-700 flex items-center mt-1">
              Bei {activeCars.length} aktiven Fahrzeugen
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Fahrzeuge (Gewinn)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCars.map((car) => (
                <div 
                  key={car.id} 
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors"
                  onClick={() => navigate(`/fahrzeuge/${car.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Car className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{car.name}</p>
                      <p className="text-xs text-gray-500">{car.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${car.profit >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                      {car.profit.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </p>
                  </div>
                </div>
              ))}
              {topCars.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Keine Fahrzeugdaten verfügbar.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Alerts & Hinweise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fahrtenOhnePreis > 0 && (
                <div 
                  className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 cursor-pointer hover:bg-amber-100 transition-colors"
                  onClick={() => navigate("/fahrten")}
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">{fahrtenOhnePreis} Fahrten ohne Preis</p>
                    <p className="text-xs text-amber-700 mt-1">Bitte Preise nachtragen, um Umsatz zu berechnen.</p>
                  </div>
                </div>
              )}
              {kostenOhneFahrzeug > 0 && (
                <div 
                  className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 cursor-pointer hover:bg-red-100 transition-colors"
                  onClick={() => navigate("/kosten")}
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Kosten ohne Fahrzeug</p>
                    <p className="text-xs text-red-700 mt-1">{kostenOhneFahrzeug} Kostenbelege konnten keinem Fahrzeug zugeordnet werden.</p>
                  </div>
                </div>
              )}
              {fahrtenOhnePreis === 0 && kostenOhneFahrzeug === 0 && (
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
                  <div className="mt-0.5 h-5 w-5 text-green-600 flex items-center justify-center">✓</div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Alles in Ordnung</p>
                    <p className="text-xs text-green-700 mt-1">Es liegen aktuell keine Warnungen vor.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
