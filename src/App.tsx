import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { Fahrten } from "./pages/Fahrten"
import { FahrtNeu } from "./pages/FahrtNeu"
import { FahrtDetail } from "./pages/FahrtDetail"
import { FahrtBearbeiten } from "./pages/FahrtBearbeiten"
import { Umsaetze } from "./pages/Umsaetze"
import { Fahrzeuge } from "./pages/Fahrzeuge"
import { FahrzeugNeu } from "./pages/FahrzeugNeu"
import { FahrzeugDetail } from "./pages/FahrzeugDetail"
import { FahrzeugBearbeiten } from "./pages/FahrzeugBearbeiten"
import { Fahrer } from "./pages/Fahrer"
import { FahrerNeu } from "./pages/FahrerNeu"
import { FahrerDetail } from "./pages/FahrerDetail"
import { FahrerBearbeiten } from "./pages/FahrerBearbeiten"
import { Kosten } from "./pages/Kosten"
import { KostenNeu } from "./pages/KostenNeu"
import { KostenBearbeiten } from "./pages/KostenBearbeiten"
import { Abrechnungen } from "./pages/Abrechnungen"
import { Statistik } from "./pages/Statistik"
import { Einstellungen } from "./pages/Einstellungen"
import { DataProvider } from "./context/DataContext"

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="fahrten" element={<Fahrten />} />
            <Route path="fahrten/neu" element={<FahrtNeu />} />
            <Route path="fahrten/:id" element={<FahrtDetail />} />
            <Route path="fahrten/:id/bearbeiten" element={<FahrtBearbeiten />} />
            <Route path="umsaetze" element={<Umsaetze />} />
            <Route path="fahrzeuge" element={<Fahrzeuge />} />
            <Route path="fahrzeuge/neu" element={<FahrzeugNeu />} />
            <Route path="fahrzeuge/:id" element={<FahrzeugDetail />} />
            <Route path="fahrzeuge/:id/bearbeiten" element={<FahrzeugBearbeiten />} />
            <Route path="fahrer" element={<Fahrer />} />
            <Route path="fahrer/neu" element={<FahrerNeu />} />
            <Route path="fahrer/:id" element={<FahrerDetail />} />
            <Route path="fahrer/:id/bearbeiten" element={<FahrerBearbeiten />} />
            <Route path="kosten" element={<Kosten />} />
            <Route path="kosten/neu" element={<KostenNeu />} />
            <Route path="kosten/:id/bearbeiten" element={<KostenBearbeiten />} />
            <Route path="abrechnungen" element={<Abrechnungen />} />
            <Route path="statistik" element={<Statistik />} />
            <Route path="einstellungen" element={<Einstellungen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}
