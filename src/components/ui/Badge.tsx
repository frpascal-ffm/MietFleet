import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2",
        {
          "border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80": variant === "default",
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80": variant === "secondary",
          "border-transparent bg-red-100 text-red-800 hover:bg-red-100/80": variant === "destructive",
          "border-transparent bg-brand-100 text-brand-800 hover:bg-brand-100/80": variant === "success",
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100/80": variant === "warning",
          "text-gray-950": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
