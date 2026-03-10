import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Users, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { Badge } from "@/src/components/ui/Badge"

export function FahrerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-500">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Users className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Max Müller</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="success">Aktiv</Badge>
              <span className="text-sm text-gray-500">Seit 01.01.2023</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kontaktdaten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              +49 170 1234567
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Mail className="h-4 w-4 text-gray-400" />
              max.mueller@beispiel.de
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              Musterstraße 45, 80331 München
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Arbeitsdaten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Stammfahrzeug</p>
                <p className="text-sm text-gray-900 mt-1">M-AB 1234</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Arbeitszeitmodell</p>
                <p className="text-sm text-gray-900 mt-1">Vollzeit</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fahrten (Gesamt)</p>
                <p className="text-sm text-gray-900 mt-1">1.450</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Umsatz (Gesamt)</p>
                <p className="text-sm text-gray-900 mt-1">85.400 €</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
