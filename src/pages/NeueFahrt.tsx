import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"

export function NeueFahrt() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Neue Fahrt erfassen</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Abbrechen</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grunddaten</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strecke & Zuordnung</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Von (Abholort)</label>
              <Input placeholder="Straße, Hausnummer, Ort" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nach (Zielort)</label>
              <Input placeholder="Straße, Hausnummer, Ort" />
            </div>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Abrechnung</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
