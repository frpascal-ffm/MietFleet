import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Download, Upload } from "lucide-react"

export function Umsaetze() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Umsätze</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Plattform-Import
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Umsatz Eigene Fahrten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18.450 €</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Umsatz Plattformen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">26.781 €</div>
            <p className="text-xs text-gray-500 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-50 border-brand-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-brand-800">Gesamtumsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-900">45.231 €</div>
            <p className="text-xs text-brand-700 mt-1">Laufender Monat</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Umsatzquellen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Quelle</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Fahrer</TableHead>
                <TableHead>Fahrzeug</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, date: "10.03.2026", source: "Eigene Fahrt", desc: "Flughafentransfer", driver: "Max Müller", car: "M-AB 1234", amount: "85,00 €" },
                { id: 2, date: "09.03.2026", source: "Plattform", desc: "Wochenabrechnung KW 10", driver: "Anna Schmidt", car: "M-XY 9876", amount: "1.245,50 €" },
                { id: 3, date: "09.03.2026", source: "Plattform", desc: "Wochenabrechnung KW 10", driver: "Tom Weber", car: "M-ZZ 5555", amount: "890,00 €" },
                { id: 4, date: "08.03.2026", source: "Eigene Fahrt", desc: "Krankenfahrt", driver: "Max Müller", car: "M-AB 1234", amount: "45,00 €" },
              ].map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-sm text-gray-900">{row.date}</TableCell>
                  <TableCell>
                    <Badge variant={row.source === "Eigene Fahrt" ? "secondary" : "outline"}>
                      {row.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{row.desc}</TableCell>
                  <TableCell className="text-sm text-gray-600">{row.driver}</TableCell>
                  <TableCell className="text-sm text-gray-600">{row.car}</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
