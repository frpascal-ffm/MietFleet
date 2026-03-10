import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FahrtStatus = 'geplant' | 'erledigt' | 'storniert';
export type Fahrttyp = 'Krankenfahrt' | 'Flughafentransfer' | 'Privatfahrt' | 'Firmenfahrt';

export interface Fahrt {
  id: string;
  date: string;
  time: string;
  type: Fahrttyp;
  from: string;
  to: string;
  driver: string;
  car: string;
  status: FahrtStatus;
  price?: string;
  tax?: string;
  customer?: string;
  notes?: string;
}

interface FahrtenContextType {
  fahrten: Fahrt[];
  addFahrt: (fahrt: Omit<Fahrt, 'id'>) => string;
  updateFahrt: (id: string, fahrt: Partial<Fahrt>) => void;
  deleteFahrt: (id: string) => void;
  getFahrt: (id: string) => Fahrt | undefined;
}

const INITIAL_FAHRTEN: Fahrt[] = [
  { id: '1', date: "2026-03-10", time: "14:30", type: "Flughafentransfer", from: "München Hbf", to: "MUC Airport", driver: "Max Müller", car: "M-AB 1234", price: "85.00", tax: "19%", status: "erledigt" },
  { id: '2', date: "2026-03-10", time: "15:15", type: "Krankenfahrt", from: "Klinikum Großhadern", to: "Schwabing", driver: "Anna Schmidt", car: "M-XY 9876", price: "45.50", tax: "0%", status: "erledigt" },
  { id: '3', date: "2026-03-10", time: "16:00", type: "Privatfahrt", from: "Marienplatz", to: "Olympiapark", driver: "Tom Weber", car: "M-ZZ 5555", price: "", tax: "19%", status: "geplant" },
  { id: '4', date: "2026-03-11", time: "08:00", type: "Firmenfahrt", from: "Allianz Arena", to: "MUC Airport", driver: "Max Müller", car: "M-AB 1234", price: "95.00", tax: "19%", status: "geplant" },
  { id: '5', date: "2026-02-28", time: "09:00", type: "Krankenfahrt", from: "Pasing", to: "Klinikum Großhadern", driver: "Anna Schmidt", car: "M-XY 9876", price: "35.00", tax: "0%", status: "erledigt" },
];

const FahrtenContext = createContext<FahrtenContextType | undefined>(undefined);

export function FahrtenProvider({ children }: { children: ReactNode }) {
  const [fahrten, setFahrten] = useState<Fahrt[]>(INITIAL_FAHRTEN);

  const addFahrt = (fahrt: Omit<Fahrt, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setFahrten(prev => [...prev, { ...fahrt, id }]);
    return id;
  };

  const updateFahrt = (id: string, updates: Partial<Fahrt>) => {
    setFahrten(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteFahrt = (id: string) => {
    setFahrten(prev => prev.filter(f => f.id !== id));
  };

  const getFahrt = (id: string) => {
    return fahrten.find(f => f.id === id);
  };

  return (
    <FahrtenContext.Provider value={{ fahrten, addFahrt, updateFahrt, deleteFahrt, getFahrt }}>
      {children}
    </FahrtenContext.Provider>
  );
}

export function useFahrten() {
  const context = useContext(FahrtenContext);
  if (!context) throw new Error('useFahrten must be used within FahrtenProvider');
  return context;
}
