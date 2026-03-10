import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { useData, FahrtStatus, Fahrttyp } from "@/src/context/DataContext"

export function FahrtBearbeiten() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getFahrt, updateFahrt, fahrer, fahrzeuge } = useData()

  const fahrt = getFahrt(id || "")

  const [type, setType] = useState<Fahrttyp>("Krankenfahrt")
  const [status, setStatus] = useState<FahrtStatus>("geplant")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [driverId, setDriverId] = useState("")
  const [carId, setCarId] = useState("")
  const [price, setPrice] = useState("")
  const [tax, setTax] = useState("19%")
  const [customer, setCustomer] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (fahrt) {
      setType(fahrt.type)
      setStatus(fahrt.status)
      setDate(fahrt.date)
      setTime(fahrt.time)
      setFrom(fahrt.from)
      setTo(fahrt.to)
      setDriverId(fahrt.driverId)
      setCarId(fahrt.carId)
      setPrice(fahrt.price || "")
      setTax(fahrt.tax || "19%")
      setCustomer(fahrt.customer || "")
      setNotes(fahrt.notes || "")
    }
  }, [fahrt])

  if (!fahrt) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Fahrt nicht gefunden</h2>
        <Button onClick={() => navigate("/fahrten")}>Zurück zur Übersicht</Button>
      </div>
    )
  }

  const handleSave = () => {
    if (!from || !to || !driverId || !carId) {
      alert("Bitte füllen Sie alle Pflichtfelder aus (Von, Nach, Fahrer, Fahrzeug).")
      return
    }

    updateFahrt(fahrt.id, {
      type,
      status,
      date,
      time,
      from,
      to,
      driverId,
      carId,
      price,
      tax,
      customer,
      notes
    })

    navigate(`/fahrten/${fahrt.id}`)
  }

  const showRevenueWarning = status === 'erledigt' && !price

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrt bearbeiten</h1>
          <p className="text-sm text-gray-500">Ändern Sie die Details der Fahrt #{fahrt.id}.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grunddaten</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Fahrttyp *</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                value={type}
                onChange={(e) => setType(e.target.value as Fahrttyp)}
              >
                <option value="Krankenfahrt">Krankenfahrt</option>
                <option value="Flughafentransfer">Flughafentransfer</option>
                <option value="Privatfahrt">Privatfahrt</option>
                <option value="Firmenfahrt">Firmenfahrt</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status *</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                value={status}
                onChange={(e) => setStatus(e.target.value as FahrtStatus)}
              >
                <option value="geplant">Geplant</option>
                <option value="erledigt">Erledigt</option>
                <option value="storniert">Storniert</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Datum *</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Uhrzeit *</label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strecke & Zuordnung</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Von (Abholort) *</label>
                <Input placeholder="Straße, Hausnummer, Ort" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nach (Zielort) *</label>
                <Input placeholder="Straße, Hausnummer, Ort" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Fahrer *</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                >
                  <option value="">Bitte wählen...</option>
                  {fahrer.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Fahrzeug *</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                >
                  <option value="">Bitte wählen...</option>
                  {fahrzeuge.map(c => (
                    <option key={c.id} value={c.id}>{c.name} {c.model ? `(${c.model})` : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Abrechnung & Details (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {showRevenueWarning && (
              <div className="flex items-start gap-3 rounded-md bg-amber-50 p-4 text-amber-800 border border-amber-200">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Hinweis zu fehlendem Preis</p>
                  <p className="mt-1">Diese Fahrt ist als "erledigt" markiert, hat aber keinen Preis. Sie wird nicht in der Umsatzstatistik berücksichtigt, bis ein Preis eingetragen wird.</p>
                </div>
              </div>
            )}
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Preis (Brutto)</label>
                <div className="relative">
                  <Input type="number" placeholder="0.00" className="pl-8" value={price} onChange={(e) => setPrice(e.target.value)} />
                  <span className="absolute left-3 top-2.5 text-sm text-gray-500">€</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">MwSt.</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                >
                  <option value="19%">19%</option>
                  <option value="7%">7%</option>
                  <option value="0%">0%</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Kunde / Firma</label>
                <Input placeholder="Optional" value={customer} onChange={(e) => setCustomer(e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Notiz / Kostenstelle</label>
                <Input placeholder="Optional" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
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
