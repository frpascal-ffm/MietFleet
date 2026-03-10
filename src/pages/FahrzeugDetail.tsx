import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Car, Plus, Edit } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { useData } from "@/src/context/DataContext"

export function FahrzeugDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getFahrzeug, fahrten, kosten, plattformUmsaetze } = useData()

  const fahrzeug = getFahrzeug(id || "")

  if (!fahrzeug) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Fahrzeug nicht gefunden</h2>
        <Button onClick={() => navigate("/fahrzeuge")}>Zurück zur Übersicht</Button>
      </div>
    )
  }

  // Calculate stats
  const vehicleFahrten = fahrten.filter(f => f.carId === fahrzeug.id)
  const vehicleKosten = kosten.filter(k => k.carId === fahrzeug.id)
  const vehiclePlattform = plattformUmsaetze.filter(p => p.carId === fahrzeug.id)

  const ownRevenue = vehicleFahrten
    .filter(f => f.status === 'erledigt' && f.price)
    .reduce((sum, f) => sum + parseFloat(f.price || "0"), 0)

  const platformRevenue = vehiclePlattform.reduce((sum, p) => sum + p.amount, 0)
  const totalRevenue = ownRevenue + platformRevenue

  const totalCosts = vehicleKosten.reduce((sum, k) => sum + parseFloat(k.amount || "0"), 0)
  const profit = totalRevenue - totalCosts

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/fahrzeuge")} className="text-gray-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Car className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{fahrzeug.name}</h1>
                <Badge variant={fahrzeug.status === "aktiv" ? "success" : "default"}>
                  {fahrzeug.status === "aktiv" ? "Aktiv" : "Inaktiv"}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{fahrzeug.brand} {fahrzeug.model}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(`/fahrzeuge/${fahrzeug.id}/bearbeiten`)}>
            <Edit className="mr-2 h-4 w-4" />
            Bearbeiten
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Fahrten (Gesamt)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{vehicleFahrten.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Umsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Kosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
          </CardContent>
        </Card>
        <Card className="bg-brand-50 border-brand-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-brand-800">Gewinn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${profit >= 0 ? 'text-brand-900' : 'text-red-600'}`}>
              {profit.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Kennzeichen / Name</p>
                <p className="text-sm text-gray-900 mt-1">{fahrzeug.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Marke</p>
                <p className="text-sm text-gray-900 mt-1">{fahrzeug.brand || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Modell</p>
                <p className="text-sm text-gray-900 mt-1">{fahrzeug.model || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Notizen</p>
                <p className="text-sm text-gray-900 mt-1">{fahrzeug.notes || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Kostenübersicht</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate("/kosten/neu")}>
              <Plus className="mr-2 h-4 w-4" />
              Kosten erfassen
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Kategorie</TableHead>
                  <TableHead className="text-right">Betrag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleKosten.map(k => (
                  <TableRow key={k.id}>
                    <TableCell className="text-sm text-gray-900">{new Date(k.date).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell className="text-sm text-gray-900">
                      <Badge variant="outline" className="font-normal">{k.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-gray-900">
                      {parseFloat(k.amount || "0").toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </TableCell>
                  </TableRow>
                ))}
                {vehicleKosten.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-gray-500">Keine Kosten erfasst.</TableCell>
                  </TableRow>
                )}
                {vehicleKosten.length > 0 && (
                  <TableRow className="bg-gray-50">
                    <TableCell colSpan={2} className="text-sm font-bold text-gray-900">Gesamtkosten</TableCell>
                    <TableCell className="text-right font-bold text-gray-900">
                      {totalCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
