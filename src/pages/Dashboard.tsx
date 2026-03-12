import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Badge } from "@/src/components/ui/Badge"
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Car, Euro, Users } from "lucide-react"
import { useData } from "@/src/context/DataContext"

export function Dashboard() {
  const { fahrten } = useData()

  // Calculate fahrten without price
  const fahrtenOhnePreis = fahrten.filter(f => f.status === "erledigt" && !f.price).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-gray-500">Letzte 30 Tage</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Gesamtumsatz</CardTitle>
            <Euro className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">45.231 €</div>
            <p className="text-xs text-brand-600 flex items-center mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12.5% zum Vormonat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Gesamtkosten</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">28.450 €</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +4.1% zum Vormonat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Gewinn</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-600">16.781 €</div>
            <p className="text-xs text-brand-600 flex items-center mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +8.2% zum Vormonat
            </p>
          </CardContent>
        </Card>
        <Card className="border-brand-200 bg-brand-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-800">Gewinn pro Fahrzeug</CardTitle>
            <Car className="h-4 w-4 text-brand-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-900">2.097 €</div>
            <p className="text-xs text-brand-700 flex items-center mt-1">
              Ø bei 8 aktiven Fahrzeugen
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
              {[
                { name: "M-AB 1234", type: "V-Klasse", profit: "3.450 €", trend: "up" },
                { name: "M-XY 9876", type: "E-Klasse", profit: "2.890 €", trend: "up" },
                { name: "M-ZZ 5555", type: "EQV", profit: "2.100 €", trend: "down" },
              ].map((car) => (
                <div key={car.name} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
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
                    <p className="text-sm font-bold text-gray-900">{car.profit}</p>
                    {car.trend === "up" ? (
                      <span className="text-xs text-brand-600 flex items-center justify-end">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 flex items-center justify-end">
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
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
                <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">{fahrtenOhnePreis} Fahrten ohne Preis</p>
                    <p className="text-xs text-amber-700 mt-1">Bitte Preise nachtragen, um Umsatz zu berechnen.</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-900">Kosten ohne Fahrzeug</p>
                  <p className="text-xs text-red-700 mt-1">3 Tankbelege konnten keinem Fahrzeug zugeordnet werden.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
