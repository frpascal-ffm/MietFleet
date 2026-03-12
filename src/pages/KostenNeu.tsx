import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { useData, KostenTyp, FixkostenKategorie, VariableKostenKategorie } from "@/src/context/DataContext"

export function KostenNeu() {
  const navigate = useNavigate()
  const { addKosten, fahrzeuge } = useData()

  const [type, setType] = useState<KostenTyp>("variabel")
  const [category, setCategory] = useState<FixkostenKategorie | VariableKostenKategorie>("Sprit")
  const [amount, setAmount] = useState("")
  const [carId, setCarId] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState("")

  const handleTypeChange = (newType: KostenTyp) => {
    setType(newType)
    if (newType === "fix") {
      setCategory("Leasing")
    } else {
      setCategory("Sprit")
    }
  }

  const handleSave = () => {
    if (!category || !amount || !carId || !date) {
      alert("Bitte füllen Sie alle Pflichtfelder aus (Kategorie, Betrag, Fahrzeug, Datum).")
      return
    }

    addKosten({
      type,
      category,
      amount,
      carId,
      date,
      notes
    })

    navigate("/kosten")
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Neue Kosten erfassen</h1>
          <p className="text-sm text-gray-500">Tragen Sie hier alle Details zu den Kosten ein.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kostendetails</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Kostentyp *</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                value={type}
                onChange={(e) => handleTypeChange(e.target.value as KostenTyp)}
              >
                <option value="variabel">Variabel</option>
                <option value="fix">Fix</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Kategorie *</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                {type === "fix" ? (
                  <>
                    <option value="Leasing">Leasing</option>
                    <option value="Versicherung">Versicherung</option>
                    <option value="Steuer">Steuer</option>
                    <option value="Sonstiges">Sonstiges</option>
                  </>
                ) : (
                  <>
                    <option value="Sprit">Sprit</option>
                    <option value="Werkstatt">Werkstatt</option>
                    <option value="Reinigung">Reinigung</option>
                    <option value="Material">Material</option>
                    <option value="Sonstiges">Sonstiges</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Datum *</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Betrag (Brutto) *</label>
              <div className="relative">
                <Input type="number" placeholder="0.00" className="pl-8" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <span className="absolute left-3 top-2.5 text-sm text-gray-500">€</span>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Fahrzeug *</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
              >
                <option value="">Bitte wählen...</option>
                {fahrzeuge.filter(c => c.status === 'aktiv').map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.model ? `(${c.model})` : ''}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Notiz / Beschreibung</label>
              <Input placeholder="Optional" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Abbrechen
        </Button>
        <Button onClick={handleSave}>
          Speichern
        </Button>
      </div>
    </div>
  )
}
