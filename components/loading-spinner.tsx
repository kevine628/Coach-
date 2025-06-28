import { Loader2, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  variant?: "default" | "branded"
  className?: string
}

export default function LoadingSpinner({ 
  size = "md", 
  text = "Chargement...", 
  variant = "default",
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }

  if (variant === "branded") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
        <div className="relative">
          <Brain className={cn("animate-pulse text-blue-600", sizeClasses[size])} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className={cn("animate-spin text-purple-600", sizeClasses[size])} />
          </div>
        </div>
        {text && (
          <p className={cn("text-gray-600 animate-pulse", textSizes[size])}>
            {text}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <Loader2 className={cn("animate-spin text-blue-600", sizeClasses[size])} />
      {text && (
        <p className={cn("text-gray-600", textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  )
}

// Composant de loading pour les pages
export function PageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingSpinner 
        size="lg" 
        text="Chargement de la page..." 
        variant="branded" 
      />
    </div>
  )
}

// Composant de loading pour les sections
export function SectionLoading() {
  return (
    <div className="py-12 flex items-center justify-center">
      <LoadingSpinner 
        size="md" 
        text="Chargement..." 
      />
    </div>
  )
}

// Composant de loading pour les boutons
export function ButtonLoading({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <LoadingSpinner 
      size={size} 
      text="" 
      className="inline-flex" 
    />
  )
} 