import { Bell, Search } from "lucide-react"
import { Input } from "@/src/components/ui/Input"
import { Button } from "@/src/components/ui/Button"

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-900">Musterbetrieb GmbH</h1>
        <div className="h-4 w-px bg-gray-300" />
        <span className="text-sm text-gray-500">März 2026</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Suchen..." 
            className="w-full bg-gray-50 pl-9 border-transparent focus-visible:bg-white focus-visible:border-brand-500" 
          />
        </div>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
