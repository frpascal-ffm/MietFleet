import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Plus, Fuel, Wrench, FileText } from "lucide-react"
import { Sheet } from "@/src/components/ui/Sheet"

export function Kosten() {
  const [isNewOpen, setIsNewOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kosten</h1>
        <Button onClick={() => setIsNewOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Neue Kosten erfassen
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Fixkosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12.450 €</div>
            <p className="text-xs text-gray-500 mt-1">Leasing, Versicherung, Steuer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Variable Kosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">16.000 €</div>
            <p className="text-xs text-gray-500 mt-1">Sprit, Werkstatt, Reinigung</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Gesamtkosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">28.450 €</div>
            <p className="text-xs text-red-700 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kostenübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Fahrzeug</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, date: "10.03.2026", cat: "Sprit", desc: "Aral Tankstelle", car: "M-AB 1234", amount: "125,50 €", icon: Fuel },
                { id: 2, date: "09.03.2026", cat: "Werkstatt", desc: "Inspektion & Ölwechsel", car: "M-XY 9876", amount: "450,00 €", icon: Wrench },
                { id: 3, date: "05.03.2026", cat: "Leasing", desc: "Monatsrate März", car: "M-ZZ 5555", amount: "890,00 €", icon: FileText },
                { id: 4, date: "02.03.2026", cat: "Versicherung", desc: "Monatsbeitrag", car: "Alle", amount: "1.200,00 €", icon: FileText },
              ].map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-sm text-gray-900">{row.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <row.icon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{row.cat}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{row.desc}</TableCell>
                  <TableCell>
                    <Badge variant={row.car === "Alle" ? "secondary" : "outline"}>
                      {row.car}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-gray-900">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet 
        isOpen={isNewOpen} 
        onClose={() => setIsNewOpen(false)} 
        title="Neue Kosten erfassen"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsNewOpen(false)}>Abbrechen</Button>
            <Button onClick={() => setIsNewOpen(false)}>Speichern</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Datum</label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Kategorie</label>
            <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              <option>Sprit / Laden</option>
              <option>Werkstatt / Wartung</option>
              <option>Reinigung</option>
              <option>Versicherung</option>
              <option>Leasing / Finanzierung</option>
              <option>Sonstiges</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Beschreibung</label>
            <Input placeholder="z.B. Tanken Aral" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Fahrzeug (Optional)</label>
            <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              <option value="">Kein spezifisches Fahrzeug</option>
              <option>M-AB 1234</option>
              <option>M-XY 9876</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Betrag (Brutto)</label>
            <div className="relative">
              <Input type="number" placeholder="0.00" className="pl-8" />
              <span className="absolute left-3 top-2.5 text-sm text-gray-500">€</span>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
