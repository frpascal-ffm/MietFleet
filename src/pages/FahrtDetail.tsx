import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Edit, Copy, CheckCircle, XCircle, MapPin, Calendar, Clock, User, Car, DollarSign, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Badge } from "@/src/components/ui/Badge"
import { useData } from "@/src/context/DataContext"

function formatDateDisplay(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}

export function FahrtDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getFahrt, updateFahrt, fahrer, fahrzeuge } = useData()

  const fahrt = getFahrt(id || "")

  if (!fahrt) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Fahrt nicht gefunden</h2>
        <Button onClick={() => navigate("/fahrten")}>Zurück zur Übersicht</Button>
      </div>
    )
  }

  const driverName = fahrer.find(d => d.id === fahrt.driverId)?.name || "Unbekannt"
  const carName = fahrzeuge.find(c => c.id === fahrt.carId)?.name || "Unbekannt"

  const handleMarkAsDone = () => {
    updateFahrt(fahrt.id, { status: "erledigt" })
  }

  const handleCancel = () => {
    if (confirm("Möchten Sie diese Fahrt wirklich stornieren?")) {
      updateFahrt(fahrt.id, { status: "storniert" })
    }
  }

  const handleDuplicate = () => {
    // In a real app, this would navigate to /fahrten/neu with pre-filled state
    // For now, we just alert
    alert("Duplizieren-Funktion in Phase 1 als Mock. Würde zur 'Neue Fahrt' Seite mit vorausgefüllten Daten leiten.")
  }

  const isRevenueRelevant = fahrt.status === "erledigt" && !!fahrt.price

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/fahrten")} className="text-gray-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fahrt #{fahrt.id}</h1>
              <Badge 
                variant={
                  fahrt.status === "erledigt" ? "success" : 
                  fahrt.status === "geplant" ? "warning" : "default"
                }
              >
                {fahrt.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">{fahrt.type}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {fahrt.status === "geplant" && (
            <>
              <Button variant="outline" className="text-green-700 border-green-200 hover:bg-green-50" onClick={handleMarkAsDone}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Als erledigt markieren
              </Button>
              <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50" onClick={handleCancel}>
                <XCircle className="mr-2 h-4 w-4" />
                Stornieren
              </Button>
            </>
          )}
          <Button variant="outline" onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplizieren
          </Button>
          <Button onClick={() => navigate(`/fahrten/${fahrt.id}/bearbeiten`)}>
            <Edit className="mr-2 h-4 w-4" />
            Bearbeiten
          </Button>
        </div>
      </div>

      {fahrt.status === "erledigt" && !fahrt.price && (
        <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Fehlender Preis</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>Diese Fahrt ist als erledigt markiert, hat aber keinen Preis hinterlegt. Sie wird nicht als Umsatz gewertet.</p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    onClick={() => navigate(`/fahrten/${fahrt.id}/bearbeiten`)}
                    className="rounded-md bg-amber-50 px-2 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-amber-50"
                  >
                    Preis eintragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRevenueRelevant && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Umsatzrelevant</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Diese Fahrt ist abgeschlossen und wird in der Umsatzstatistik mit {fahrt.price} € berücksichtigt.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Zeit & Ort</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Datum</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDateDisplay(fahrt.date)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Uhrzeit</p>
                  <p className="text-sm text-gray-900 mt-1">{fahrt.time} Uhr</p>
                </div>
              </div>
            </div>
            
            <div className="relative pl-8 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-gray-200">
              <div className="relative">
                <div className="absolute -left-8 top-1 h-3 w-3 rounded-full border-2 border-brand-500 bg-white" />
                <p className="text-sm font-medium text-gray-500">Abholort</p>
                <p className="text-sm text-gray-900 mt-1">{fahrt.from}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-8 top-1 h-3 w-3 rounded-full border-2 border-gray-900 bg-white" />
                <p className="text-sm font-medium text-gray-500">Zielort</p>
                <p className="text-sm text-gray-900 mt-1">{fahrt.to}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zuordnung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Fahrer</p>
                <p className="text-sm text-gray-900 mt-1">{driverName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Car className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Fahrzeug</p>
                <p className="text-sm text-gray-900 mt-1">{carName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Abrechnung & Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Preis (Brutto)</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {fahrt.price ? `${fahrt.price} €` : "-"}
                  </p>
                  {fahrt.tax && <p className="text-xs text-gray-500 mt-1">inkl. {fahrt.tax} MwSt.</p>}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="w-full">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Kunde / Firma</p>
                    <p className="text-sm text-gray-900 mt-1">{fahrt.customer || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notiz / Kostenstelle</p>
                    <p className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded-md min-h-[60px]">
                      {fahrt.notes || "Keine Notizen vorhanden."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
