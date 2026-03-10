import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { useData, FahrzeugStatus } from "@/src/context/DataContext"

export function FahrzeugBearbeiten() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getFahrzeug, updateFahrzeug } = useData()

  const fahrzeug = getFahrzeug(id || "")

  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [status, setStatus] = useState<FahrzeugStatus>("aktiv")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (fahrzeug) {
      setName(fahrzeug.name)
      setBrand(fahrzeug.brand || "")
      setModel(fahrzeug.model || "")
      setStatus(fahrzeug.status)
      setNotes(fahrzeug.notes || "")
    }
  }, [fahrzeug])

  if (!fahrzeug) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Fahrzeug nicht gefunden</h2>
        <Button onClick={() => navigate("/fahrzeuge")}>Zurück zur Übersicht</Button>
      </div>
    )
  }

  const handleSave = () => {
    if (!name) {
      alert("Bitte geben Sie ein Kennzeichen oder einen Namen ein.")
      return
    }

    updateFahrzeug(fahrzeug.id, {
      name,
      brand,
      model,
      status,
      notes
    })

    navigate(`/fahrzeuge/${fahrzeug.id}`)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrzeug bearbeiten</h1>
          <p className="text-sm text-gray-500">Ändern Sie die Details des Fahrzeugs {fahrzeug.name}.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grunddaten</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Kennzeichen / Name *</label>
              <Input placeholder="z.B. M-AB 1234" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status *</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                value={status}
                onChange={(e) => setStatus(e.target.value as FahrzeugStatus)}
              >
                <option value="aktiv">Aktiv</option>
                <option value="inaktiv">Inaktiv</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Marke</label>
              <Input placeholder="z.B. Mercedes" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Modell</label>
              <Input placeholder="z.B. V-Klasse" value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Notizen</label>
              <Input placeholder="Optionale Notizen zum Fahrzeug" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto">
            Abbrechen
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Änderungen speichern
          </Button>
        </div>
      </div>
    </div>
  )
}
