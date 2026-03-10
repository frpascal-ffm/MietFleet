import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Save } from "lucide-react"

export function Einstellungen() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Einstellungen</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Speichern
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Firmendaten</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Firmenname</label>
              <Input defaultValue="Musterbetrieb GmbH" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Inhaber / Geschäftsführer</label>
              <Input defaultValue="Jan Doe" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Straße & Hausnummer</label>
              <Input defaultValue="Musterstraße 123" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">PLZ</label>
              <Input defaultValue="80331" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ort</label>
              <Input defaultValue="München" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
