import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { Fahrten } from "./pages/Fahrten"
import { Umsaetze } from "./pages/Umsaetze"
import { Fahrzeuge } from "./pages/Fahrzeuge"
import { FahrzeugDetail } from "./pages/FahrzeugDetail"
import { Fahrer } from "./pages/Fahrer"
import { FahrerDetail } from "./pages/FahrerDetail"
import { Kosten } from "./pages/Kosten"
import { Abrechnungen } from "./pages/Abrechnungen"
import { Statistik } from "./pages/Statistik"
import { Einstellungen } from "./pages/Einstellungen"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="fahrten" element={<Fahrten />} />
          <Route path="umsaetze" element={<Umsaetze />} />
          <Route path="fahrzeuge" element={<Fahrzeuge />} />
          <Route path="fahrzeuge/:id" element={<FahrzeugDetail />} />
          <Route path="fahrer" element={<Fahrer />} />
          <Route path="fahrer/:id" element={<FahrerDetail />} />
          <Route path="kosten" element={<Kosten />} />
          <Route path="abrechnungen" element={<Abrechnungen />} />
          <Route path="statistik" element={<Statistik />} />
          <Route path="einstellungen" element={<Einstellungen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
