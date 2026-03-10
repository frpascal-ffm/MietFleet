import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Plus, Car } from "lucide-react"
import { Sheet } from "@/src/components/ui/Sheet"

export function Fahrzeuge() {
  const navigate = useNavigate()
  const [isNewOpen, setIsNewOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrzeuge</h1>
        <Button onClick={() => setIsNewOpen(true)}>
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
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-brand-600 mt-1">Alle im Einsatz</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ø Umsatz pro Fzg.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">5.653 €</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ø Kosten pro Fzg.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3.556 €</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-50 border-brand-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-brand-800">Ø Gewinn pro Fzg.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-900">2.097 €</div>
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
              {[
                { id: 1, plate: "M-AB 1234", model: "Mercedes V-Klasse", status: "Aktiv", rev: "8.450 €", cost: "5.000 €", profit: "3.450 €", margin: "40.8%" },
                { id: 2, plate: "M-XY 9876", model: "Mercedes E-Klasse", status: "Aktiv", rev: "6.890 €", cost: "4.000 €", profit: "2.890 €", margin: "41.9%" },
                { id: 3, plate: "M-ZZ 5555", model: "Mercedes EQV", status: "Aktiv", rev: "5.100 €", cost: "3.000 €", profit: "2.100 €", margin: "41.1%" },
                { id: 4, plate: "M-CC 1111", model: "VW Caravelle", status: "Werkstatt", rev: "1.200 €", cost: "2.500 €", profit: "-1.300 €", margin: "-108.3%" },
              ].map((car) => (
                <TableRow key={car.id} className="cursor-pointer" onClick={() => navigate(`/fahrzeuge/${car.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                        <Car className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{car.plate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{car.model}</TableCell>
                  <TableCell>
                    <Badge variant={car.status === "Aktiv" ? "success" : "destructive"}>
                      {car.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-600">{car.rev}</TableCell>
                  <TableCell className="text-right text-sm text-gray-600">{car.cost}</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">{car.profit}</TableCell>
                  <TableCell className="text-right text-sm text-gray-600">{car.margin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet 
        isOpen={isNewOpen} 
        onClose={() => setIsNewOpen(false)} 
        title="Neues Fahrzeug anlegen"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsNewOpen(false)}>Abbrechen</Button>
            <Button onClick={() => setIsNewOpen(false)}>Speichern</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Kennzeichen</label>
            <Input placeholder="z.B. M-AB 1234" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Marke & Modell</label>
            <Input placeholder="z.B. Mercedes V-Klasse" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Fahrzeugtyp</label>
            <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              <option>Van / Kleinbus</option>
              <option>Limousine</option>
              <option>Kombi</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              <option>Aktiv</option>
              <option>Werkstatt</option>
              <option>Inaktiv</option>
            </select>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
