import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { useData, FahrerStatus } from "@/src/context/DataContext"

export function FahrerNeu() {
  const navigate = useNavigate()
  const { addFahrer, fahrzeuge } = useData()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<FahrerStatus>("aktiv")
  const [defaultCarId, setDefaultCarId] = useState("")
  const [notes, setNotes] = useState("")

  const handleSave = () => {
    if (!name) {
      alert("Bitte geben Sie einen Namen ein.")
      return
    }

    const id = addFahrer({
      name,
      phone,
      email,
      status,
      defaultCarId: defaultCarId || undefined,
      notes
    })

    navigate(`/fahrer/${id}`)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Neuen Fahrer erfassen</h1>
          <p className="text-sm text-gray-500">Tragen Sie hier alle Details zum neuen Fahrer ein.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grunddaten</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name *</label>
              <Input placeholder="z.B. Max Müller" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status *</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                value={status}
                onChange={(e) => setStatus(e.target.value as FahrerStatus)}
              >
                <option value="aktiv">Aktiv</option>
                <option value="inaktiv">Inaktiv</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Telefonnummer</label>
              <Input placeholder="z.B. +49 170 1234567" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-Mail</label>
              <Input type="email" placeholder="z.B. max@beispiel.de" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Stammfahrzeug</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                value={defaultCarId}
                onChange={(e) => setDefaultCarId(e.target.value)}
              >
                <option value="">Kein Stammfahrzeug</option>
                {fahrzeuge.map(car => (
                  <option key={car.id} value={car.id}>{car.name} {car.model ? `(${car.model})` : ''}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Notizen</label>
              <Input placeholder="Optionale Notizen zum Fahrer" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto">
            Abbrechen
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Speichern
          </Button>
        </div>
      </div>
    </div>
  )
}
