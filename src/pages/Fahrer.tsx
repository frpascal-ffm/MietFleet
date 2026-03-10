import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Plus, Users } from "lucide-react"
import { Sheet } from "@/src/components/ui/Sheet"

export function Fahrer() {
  const navigate = useNavigate()
  const [isNewOpen, setIsNewOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrer</h1>
        <Button onClick={() => setIsNewOpen(true)}>
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
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-brand-600 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ø Umsatz pro Fahrer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3.769 €</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ø Fahrten pro Fahrer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">84</div>
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
              {[
                { id: 1, name: "Max Müller", status: "Aktiv", car: "M-AB 1234", trips: 120, rev: "5.450 €", perf: "Hoch" },
                { id: 2, name: "Anna Schmidt", status: "Aktiv", car: "M-XY 9876", trips: 95, rev: "4.890 €", perf: "Hoch" },
                { id: 3, name: "Tom Weber", status: "Aktiv", car: "M-ZZ 5555", trips: 80, rev: "3.100 €", perf: "Mittel" },
                { id: 4, name: "Lisa Meier", status: "Krank", car: "-", trips: 12, rev: "450 €", perf: "Niedrig" },
              ].map((driver) => (
                <TableRow key={driver.id} className="cursor-pointer" onClick={() => navigate(`/fahrer/${driver.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <Users className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{driver.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={driver.status === "Aktiv" ? "success" : driver.status === "Krank" ? "destructive" : "warning"}>
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{driver.car}</TableCell>
                  <TableCell className="text-right text-sm text-gray-600">{driver.trips}</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">{driver.rev}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={driver.perf === "Hoch" ? "success" : driver.perf === "Mittel" ? "secondary" : "destructive"}>
                      {driver.perf}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet 
        isOpen={isNewOpen} 
        onClose={() => setIsNewOpen(false)} 
        title="Neuen Fahrer anlegen"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsNewOpen(false)}>Abbrechen</Button>
            <Button onClick={() => setIsNewOpen(false)}>Speichern</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Vorname</label>
            <Input placeholder="Max" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nachname</label>
            <Input placeholder="Müller" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Telefonnummer</label>
            <Input type="tel" placeholder="+49 170 1234567" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">E-Mail</label>
            <Input type="email" placeholder="max@beispiel.de" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Stammfahrzeug</label>
            <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              <option value="">Kein Stammfahrzeug</option>
              <option>M-AB 1234 (V-Klasse)</option>
              <option>M-XY 9876 (E-Klasse)</option>
            </select>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
