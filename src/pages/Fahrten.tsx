import { useState } from "react"
import { Plus, Search, Filter, Calendar } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Sheet } from "@/src/components/ui/Sheet"

export function Fahrten() {
  const [isNewFahrtOpen, setIsNewFahrtOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrten</h1>
        <Button onClick={() => setIsNewFahrtOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Neue Fahrt
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Suchen nach Fahrer, Fahrzeug, Ort..." className="pl-9" />
          </div>
          <Button variant="outline" className="text-gray-600 shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-[250px] justify-start text-left font-normal bg-white text-gray-700 shadow-sm">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span>01. Mär 2026 - 31. Mär 2026</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum / Zeit</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Von / Nach</TableHead>
              <TableHead>Fahrer</TableHead>
              <TableHead>Fahrzeug</TableHead>
              <TableHead className="text-right">Preis</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: 1, date: "10.03.2026", time: "14:30", type: "Flughafentransfer", from: "München Hbf", to: "MUC Airport", driver: "Max Müller", car: "M-AB 1234", price: "85,00 €", status: "erledigt" },
              { id: 2, date: "10.03.2026", time: "15:15", type: "Krankenfahrt", from: "Klinikum Großhadern", to: "Schwabing", driver: "Anna Schmidt", car: "M-XY 9876", price: "45,50 €", status: "erledigt" },
              { id: 3, date: "10.03.2026", time: "16:00", type: "Privatfahrt", from: "Marienplatz", to: "Olympiapark", driver: "Tom Weber", car: "M-ZZ 5555", price: "-", status: "geplant" },
              { id: 4, date: "11.03.2026", time: "08:00", type: "Firmenfahrt", from: "Allianz Arena", to: "MUC Airport", driver: "Max Müller", car: "M-AB 1234", price: "95,00 €", status: "geplant" },
            ].map((fahrt) => (
              <TableRow key={fahrt.id} className="cursor-pointer">
                <TableCell>
                  <div className="font-medium text-gray-900">{fahrt.date}</div>
                  <div className="text-xs text-gray-500">{fahrt.time}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal text-gray-600 bg-gray-50">
                    {fahrt.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900">{fahrt.from}</div>
                  <div className="text-xs text-gray-500">nach {fahrt.to}</div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{fahrt.driver}</TableCell>
                <TableCell className="text-sm text-gray-600">{fahrt.car}</TableCell>
                <TableCell className="text-right font-medium text-gray-900">{fahrt.price}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      fahrt.status === "erledigt" ? "success" : 
                      fahrt.status === "geplant" ? "warning" : "default"
                    }
                  >
                    {fahrt.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet 
        isOpen={isNewFahrtOpen} 
        onClose={() => setIsNewFahrtOpen(false)} 
        title="Neue Fahrt erfassen"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsNewFahrtOpen(false)}>Abbrechen</Button>
            <Button onClick={() => setIsNewFahrtOpen(false)}>Speichern</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Grunddaten</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Fahrttyp</label>
                <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                  <option>Krankenfahrt</option>
                  <option>Flughafentransfer</option>
                  <option>Privatfahrt</option>
                  <option>Firmenfahrt</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                  <option>Geplant</option>
                  <option>Erledigt</option>
                  <option>Storniert</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Datum</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Uhrzeit</label>
                <Input type="time" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Strecke & Zuordnung</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Von (Abholort)</label>
                <Input placeholder="Straße, Hausnummer, Ort" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nach (Zielort)</label>
                <Input placeholder="Straße, Hausnummer, Ort" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fahrer</label>
                  <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    <option value="">Bitte wählen...</option>
                    <option>Max Müller</option>
                    <option>Anna Schmidt</option>
                    <option>Tom Weber</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fahrzeug</label>
                  <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    <option value="">Bitte wählen...</option>
                    <option>M-AB 1234 (V-Klasse)</option>
                    <option>M-XY 9876 (E-Klasse)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Abrechnung</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Preis (Brutto)</label>
                <div className="relative">
                  <Input type="number" placeholder="0.00" className="pl-8" />
                  <span className="absolute left-3 top-2.5 text-sm text-gray-500">€</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">MwSt.</label>
                <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                  <option>19%</option>
                  <option>7%</option>
                  <option>0%</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Notiz / Kostenstelle</label>
                <Input placeholder="Optional" />
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
