import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Button } from "@/src/components/ui/Button"
import { Download, FileText } from "lucide-react"

export function Abrechnungen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Abrechnungen</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Abrechnung erstellen
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fahrerabrechnungen (Vorschau)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zeitraum</TableHead>
                <TableHead>Fahrer</TableHead>
                <TableHead className="text-right">Fahrten</TableHead>
                <TableHead className="text-right">Umsatz (Brutto)</TableHead>
                <TableHead className="text-right">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, period: "März 2026", driver: "Max Müller", trips: 120, rev: "5.450,00 €" },
                { id: 2, period: "März 2026", driver: "Anna Schmidt", trips: 95, rev: "4.890,00 €" },
                { id: 3, period: "März 2026", driver: "Tom Weber", trips: 80, rev: "3.100,00 €" },
              ].map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-sm text-gray-900">{row.period}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{row.driver}</TableCell>
                  <TableCell className="text-right text-sm text-gray-600">{row.trips}</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">{row.rev}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 text-gray-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
