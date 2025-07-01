"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Target, BookOpen, CheckSquare, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { useRouter } from "next/navigation"

interface SearchResult {
  id: string
  title: string
  type: 'goal' | 'task' | 'journal'
  description?: string
  url: string
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const searchItems = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setResults(data.results)
        }
      } catch (error) {
        console.error('Erreur lors de la recherche:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(searchItems, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleSelect = (result: SearchResult) => {
    setOpen(false)
    setQuery("")
    router.push(result.url)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return <Target className="w-4 h-4 text-blue-600" />
      case 'task':
        return <CheckSquare className="w-4 h-4 text-green-600" />
      case 'journal':
        return <BookOpen className="w-4 h-4 text-purple-600" />
      default:
        return <Search className="w-4 h-4 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'goal':
        return 'Objectif'
      case 'task':
        return 'Tâche'
      case 'journal':
        return 'Journal'
      default:
        return 'Autre'
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-72 justify-start text-sm text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Rechercher...
          <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput
            ref={inputRef}
            placeholder="Rechercher des objectifs, tâches, notes..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Recherche en cours...
                </div>
              ) : query.length < 2 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Tapez au moins 2 caractères pour rechercher
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Aucun résultat trouvé pour "{query}"
                </div>
              )}
            </CommandEmpty>
            {results.length > 0 && (
              <CommandGroup heading="Résultats">
                {results.map((result) => (
                  <CommandItem
                    key={`${result.type}-${result.id}`}
                    onSelect={() => handleSelect(result)}
                    className="flex items-center gap-3 p-3"
                  >
                    <div className="flex-shrink-0">
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">
                          {result.title}
                        </p>
                        <span className="text-xs text-muted-foreground ml-2">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 