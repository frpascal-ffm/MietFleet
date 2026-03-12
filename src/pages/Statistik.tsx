import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useData } from "@/src/context/DataContext"
import { useMemo } from "react";

export function Statistik() {
  const { fahrten, kosten, plattformUmsaetze } = useData()

  const monthlyData = useMemo(() => {
    const dataMap: Record<string, { name: string, umsatz: number, kosten: number, gewinn: number, sortKey: string }> = {}

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      const monthStr = d.toLocaleString('de-DE', { month: 'short' })
      const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      dataMap[sortKey] = { name: monthStr, umsatz: 0, kosten: 0, gewinn: 0, sortKey }
    }

    // Add Fahrten revenue
    fahrten.forEach(f => {
      if (f.status === 'erledigt' && f.price) {
        const d = new Date(f.date)
        const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        if (dataMap[sortKey]) {
          dataMap[sortKey].umsatz += parseFloat(f.price)
        }
      }
    })

    // Add Plattform revenue
    plattformUmsaetze.forEach(p => {
      const d = new Date(p.date)
      const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (dataMap[sortKey]) {
        dataMap[sortKey].umsatz += p.amount
      }
    })

    // Add Kosten
    kosten.forEach(k => {
      const d = new Date(k.date)
      const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (dataMap[sortKey]) {
        dataMap[sortKey].kosten += parseFloat(k.amount || "0")
      }
    })

    // Calculate Gewinn
    Object.values(dataMap).forEach(m => {
      m.gewinn = m.umsatz - m.kosten
    })

    return Object.values(dataMap).sort((a, b) => a.sortKey.localeCompare(b.sortKey))
  }, [fahrten, kosten, plattformUmsaetze])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Statistik</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Umsatz vs. Kosten (Letzte 6 Monate)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar dataKey="umsatz" name="Umsatz" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="kosten" name="Kosten" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gewinnentwicklung (Letzte 6 Monate)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="gewinn" name="Gewinn" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
