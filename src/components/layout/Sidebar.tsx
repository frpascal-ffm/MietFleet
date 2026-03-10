import { NavLink } from "react-router-dom"
import { LayoutDashboard, Car, Euro, Users, FileText, BarChart3, Settings, Receipt, Fuel, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/Button"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Fahrten", href: "/fahrten", icon: Car },
  { name: "Umsätze", href: "/umsaetze", icon: Euro },
  { name: "Fahrzeuge", href: "/fahrzeuge", icon: Car },
  { name: "Fahrer", href: "/fahrer", icon: Users },
  { name: "Kosten", href: "/kosten", icon: Fuel },
  { name: "Abrechnungen", href: "/abrechnungen", icon: Receipt },
  { name: "Statistik", href: "/statistik", icon: BarChart3 },
  { name: "Einstellungen", href: "/einstellungen", icon: Settings },
]

export function Sidebar({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
  return (
    <div className={cn("flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300", isCollapsed ? "w-20" : "w-64")}>
      <div className="flex h-16 items-center px-4 border-b border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
            M
          </div>
          {!isCollapsed && <span className="text-lg font-semibold tracking-tight text-gray-900 whitespace-nowrap">MietFleet</span>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              title={isCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  isCollapsed && "justify-center px-0"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      !isCollapsed && "mr-3",
                      isActive ? "text-brand-600" : "text-gray-400 group-hover:text-gray-500"
                    )}
                    aria-hidden="true"
                  />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-200 p-4">
        <Button 
          variant="ghost" 
          onClick={onToggle} 
          className={cn("w-full flex text-gray-500 hover:text-gray-900", isCollapsed ? "justify-center px-0" : "justify-start")}
          title={isCollapsed ? "Ausklappen" : "Einklappen"}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5 shrink-0" /> : <><ChevronLeft className="mr-2 h-5 w-5 shrink-0" /> Einklappen</>}
        </Button>
      </div>
    </div>
  )
}
