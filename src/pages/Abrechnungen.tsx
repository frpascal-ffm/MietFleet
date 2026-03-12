import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table"
import { Button } from "@/src/components/ui/Button"
import { Download, FileText } from "lucide-react"
import { useData } from "@/src/context/DataContext"
import { useMemo } from "react"

export function Abrechnungen() {
  const { fahrer, fahrten, plattformUmsaetze } = useData()

  const currentMonthStr = new Date().toLocaleString('de-DE', { month: 'long', year: 'numeric' })

  const abrechnungen = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    return fahrer.map(driver => {
      // Filter Fahrten for current month
      const driverFahrten = fahrten.filter(f => {
        if (f.driverId !== driver.id || f.status !== 'erledigt') return false
        const d = new Date(f.date)
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear
      })

      const ownRevenue = driverFahrten
        .filter(f => f.price)
        .reduce((sum, f) => sum + parseFloat(f.price || "0"), 0)

      // Filter PlattformUmsaetze for current month
      const driverPlattform = plattformUmsaetze.filter(p => {
        if (p.driverId !== driver.id) return false
        const d = new Date(p.date)
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear
      })

      const platformRevenue = driverPlattform.reduce((sum, p) => sum + p.amount, 0)

      return {
        id: driver.id,
        driver: driver.name,
        trips: driverFahrten.length,
        rev: ownRevenue + platformRevenue
      }
    }).filter(a => a.trips > 0 || a.rev > 0) // Only show drivers with activity this month
  }, [fahrer, fahrten, plattformUmsaetze])

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
          <CardTitle>Fahrerabrechnungen (Vorschau {currentMonthStr})</CardTitle>
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
              {abrechnungen.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-sm text-gray-900">{currentMonthStr}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{row.driver}</TableCell>
                  <TableCell className="text-right text-sm text-gray-600">{row.trips}</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">
                    {row.rev.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" title="PDF herunterladen (Mock)">
                      <Download className="h-4 w-4 text-gray-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {abrechnungen.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Keine Abrechnungsdaten für diesen Monat vorhanden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
