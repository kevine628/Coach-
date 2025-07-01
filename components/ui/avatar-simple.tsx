import React from "react"

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = "Avatar", 
  fallback = "U", 
  className = "" 
}) => {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
      {src ? (
        <img
          className="aspect-square h-full w-full"
          src={src}
          alt={alt}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600">
          {fallback}
        </div>
      )}
    </div>
  )
}

export const AvatarImage: React.FC<{ src?: string; alt?: string; className?: string }> = ({ 
  src, 
  alt = "Avatar", 
  className = "" 
}) => {
  return src ? (
    <img
      className={`aspect-square h-full w-full ${className}`}
      src={src}
      alt={alt}
    />
  ) : null
}

export const AvatarFallback: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 ${className}`}>
      {children}
    </div>
  )
} 