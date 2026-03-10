import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Car, Plus } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"

export function FahrzeugDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Car className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">M-AB 1234</h1>
            <p className="text-sm text-gray-500">Mercedes V-Klasse</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stammdaten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Kennzeichen</p>
                <p className="text-sm text-gray-900 mt-1">M-AB 1234</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="text-sm text-gray-900 mt-1">Aktiv</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Erstzulassung</p>
                <p className="text-sm text-gray-900 mt-1">12.05.2024</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Kilometerstand</p>
                <p className="text-sm text-gray-900 mt-1">45.230 km</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Fixkosten pro Monat</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Kosten hinzufügen
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kostenart</TableHead>
                  <TableHead className="text-right">Betrag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-sm text-gray-900">Leasingrate</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">850,00 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm text-gray-900">Versicherung</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">120,00 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm text-gray-900">Steuer (anteilig)</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">35,00 €</TableCell>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableCell className="text-sm font-bold text-gray-900">Gesamt Fixkosten</TableCell>
                  <TableCell className="text-right font-bold text-gray-900">1.005,00 €</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
