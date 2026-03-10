import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FahrtStatus = 'geplant' | 'erledigt' | 'storniert';
export type Fahrttyp = 'Krankenfahrt' | 'Flughafentransfer' | 'Privatfahrt' | 'Firmenfahrt';
export type FahrzeugStatus = 'aktiv' | 'inaktiv';
export type FahrerStatus = 'aktiv' | 'inaktiv';
export type KostenTyp = 'fix' | 'variabel';
export type FixkostenKategorie = 'Leasing' | 'Versicherung' | 'Steuer' | 'Sonstiges';
export type VariableKostenKategorie = 'Sprit' | 'Werkstatt' | 'Reinigung' | 'Material' | 'Sonstiges';

export interface Fahrzeug {
  id: string;
  name: string; // Kennzeichen oder interner Name
  brand?: string;
  model?: string;
  status: FahrzeugStatus;
  notes?: string;
}

export interface Fahrer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  status: FahrerStatus;
  defaultCarId?: string;
  notes?: string;
}

export interface Fahrt {
  id: string;
  date: string;
  time: string;
  type: Fahrttyp;
  from: string;
  to: string;
  driverId: string;
  carId: string;
  status: FahrtStatus;
  price?: string;
  tax?: string;
  customer?: string;
  notes?: string;
}

export interface Kosten {
  id: string;
  type: KostenTyp;
  category: FixkostenKategorie | VariableKostenKategorie;
  amount: string;
  carId: string;
  date: string;
  notes?: string;
}

export interface PlattformUmsatz {
  id: string;
  date: string;
  source: string;
  driverId: string;
  carId: string;
  amount: number;
}

interface DataContextType {
  fahrzeuge: Fahrzeug[];
  addFahrzeug: (f: Omit<Fahrzeug, 'id'>) => string;
  updateFahrzeug: (id: string, f: Partial<Fahrzeug>) => void;
  getFahrzeug: (id: string) => Fahrzeug | undefined;

  fahrer: Fahrer[];
  addFahrer: (f: Omit<Fahrer, 'id'>) => string;
  updateFahrer: (id: string, f: Partial<Fahrer>) => void;
  getFahrer: (id: string) => Fahrer | undefined;

  fahrten: Fahrt[];
  addFahrt: (f: Omit<Fahrt, 'id'>) => string;
  updateFahrt: (id: string, f: Partial<Fahrt>) => void;
  deleteFahrt: (id: string) => void;
  getFahrt: (id: string) => Fahrt | undefined;

  kosten: Kosten[];
  addKosten: (k: Omit<Kosten, 'id'>) => string;
  updateKosten: (id: string, k: Partial<Kosten>) => void;
  deleteKosten: (id: string) => void;
  getKosten: (id: string) => Kosten | undefined;

  plattformUmsaetze: PlattformUmsatz[];
}

const INITIAL_FAHRZEUGE: Fahrzeug[] = [
  { id: 'car1', name: 'M-AB 1234', brand: 'Mercedes', model: 'V-Klasse', status: 'aktiv' },
  { id: 'car2', name: 'M-XY 9876', brand: 'Mercedes', model: 'E-Klasse', status: 'aktiv' },
  { id: 'car3', name: 'M-ZZ 5555', brand: 'Mercedes', model: 'EQV', status: 'aktiv' },
  { id: 'car4', name: 'M-AA 1111', brand: 'VW', model: 'Caravelle', status: 'inaktiv' },
];

const INITIAL_FAHRER: Fahrer[] = [
  { id: 'drv1', name: 'Max Müller', status: 'aktiv', defaultCarId: 'car1' },
  { id: 'drv2', name: 'Anna Schmidt', status: 'aktiv', defaultCarId: 'car2' },
  { id: 'drv3', name: 'Tom Weber', status: 'aktiv', defaultCarId: 'car3' },
];

const INITIAL_FAHRTEN: Fahrt[] = [
  { id: '1', date: "2026-03-10", time: "14:30", type: "Flughafentransfer", from: "München Hbf", to: "MUC Airport", driverId: "drv1", carId: "car1", price: "85.00", tax: "19%", status: "erledigt" },
  { id: '2', date: "2026-03-10", time: "15:15", type: "Krankenfahrt", from: "Klinikum Großhadern", to: "Schwabing", driverId: "drv2", carId: "car2", price: "45.50", tax: "0%", status: "erledigt" },
  { id: '3', date: "2026-03-10", time: "16:00", type: "Privatfahrt", from: "Marienplatz", to: "Olympiapark", driverId: "drv3", carId: "car3", price: "", tax: "19%", status: "geplant" },
  { id: '4', date: "2026-03-11", time: "08:00", type: "Firmenfahrt", from: "Allianz Arena", to: "MUC Airport", driverId: "drv1", carId: "car1", price: "95.00", tax: "19%", status: "geplant" },
  { id: '5', date: "2026-02-28", time: "09:00", type: "Krankenfahrt", from: "Pasing", to: "Klinikum Großhadern", driverId: "drv2", carId: "car2", price: "35.00", tax: "0%", status: "erledigt" },
];

const INITIAL_KOSTEN: Kosten[] = [
  { id: 'k1', type: 'fix', category: 'Leasing', amount: '450.00', carId: 'car1', date: '2026-03-01' },
  { id: 'k2', type: 'fix', category: 'Versicherung', amount: '120.00', carId: 'car1', date: '2026-03-01' },
  { id: 'k3', type: 'variabel', category: 'Sprit', amount: '85.50', carId: 'car1', date: '2026-03-05' },
  { id: 'k4', type: 'fix', category: 'Leasing', amount: '380.00', carId: 'car2', date: '2026-03-01' },
  { id: 'k5', type: 'variabel', category: 'Sprit', amount: '65.00', carId: 'car2', date: '2026-03-08' },
  { id: 'k6', type: 'variabel', category: 'Werkstatt', amount: '250.00', carId: 'car3', date: '2026-03-02' },
];

const INITIAL_PLATTFORM_UMSAETZE: PlattformUmsatz[] = [
  { id: 'p1', date: "2026-03-09", source: "Uber", driverId: "drv2", carId: "car2", amount: 1245.50 },
  { id: 'p2', date: "2026-03-09", source: "Bolt", driverId: "drv3", carId: "car3", amount: 890.00 },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [fahrzeuge, setFahrzeuge] = useState<Fahrzeug[]>(INITIAL_FAHRZEUGE);
  const [fahrer, setFahrer] = useState<Fahrer[]>(INITIAL_FAHRER);
  const [fahrten, setFahrten] = useState<Fahrt[]>(INITIAL_FAHRTEN);
  const [kosten, setKosten] = useState<Kosten[]>(INITIAL_KOSTEN);
  const [plattformUmsaetze] = useState<PlattformUmsatz[]>(INITIAL_PLATTFORM_UMSAETZE);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addFahrzeug = (f: Omit<Fahrzeug, 'id'>) => { const id = generateId(); setFahrzeuge(prev => [...prev, { ...f, id }]); return id; };
  const updateFahrzeug = (id: string, f: Partial<Fahrzeug>) => setFahrzeuge(prev => prev.map(item => item.id === id ? { ...item, ...f } : item));
  const getFahrzeug = (id: string) => fahrzeuge.find(f => f.id === id);

  const addFahrer = (f: Omit<Fahrer, 'id'>) => { const id = generateId(); setFahrer(prev => [...prev, { ...f, id }]); return id; };
  const updateFahrer = (id: string, f: Partial<Fahrer>) => setFahrer(prev => prev.map(item => item.id === id ? { ...item, ...f } : item));
  const getFahrer = (id: string) => fahrer.find(f => f.id === id);

  const addFahrt = (f: Omit<Fahrt, 'id'>) => { const id = generateId(); setFahrten(prev => [...prev, { ...f, id }]); return id; };
  const updateFahrt = (id: string, f: Partial<Fahrt>) => setFahrten(prev => prev.map(item => item.id === id ? { ...item, ...f } : item));
  const deleteFahrt = (id: string) => setFahrten(prev => prev.filter(f => f.id !== id));
  const getFahrt = (id: string) => fahrten.find(f => f.id === id);

  const addKosten = (k: Omit<Kosten, 'id'>) => { const id = generateId(); setKosten(prev => [...prev, { ...k, id }]); return id; };
  const updateKosten = (id: string, k: Partial<Kosten>) => setKosten(prev => prev.map(item => item.id === id ? { ...item, ...k } : item));
  const deleteKosten = (id: string) => setKosten(prev => prev.filter(k => k.id !== id));
  const getKosten = (id: string) => kosten.find(k => k.id === id);

  return (
    <DataContext.Provider value={{
      fahrzeuge, addFahrzeug, updateFahrzeug, getFahrzeug,
      fahrer, addFahrer, updateFahrer, getFahrer,
      fahrten, addFahrt, updateFahrt, deleteFahrt, getFahrt,
      kosten, addKosten, updateKosten, deleteKosten, getKosten,
      plattformUmsaetze
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
