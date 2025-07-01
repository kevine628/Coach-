"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "ui/sheet"
import { Badge } from "ui/badge"
import {
  Brain,
  Target,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  Menu,
  User,
  Trophy,
  BarChart3,
  Search,
  Calendar,
} from "lucide-react"
import { useToast } from "../hooks/use-toast"
import { ThemeToggle } from "theme-toggle"

interface NavigationProps {
  isAuthenticated?: boolean
  user?: {
    name?: string | null
    email: string
  }
  notificationsCount?: number
}

export default function Navigation({ isAuthenticated = false, user, notificationsCount = 0 }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès"
    })
    window.location.href = '/connexion'
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const navigationItems = [
    { href: "/tableau-de-bord", label: "Tableau de bord", icon: Brain },
    { href: "/objectifs", label: "Objectifs", icon: Target },
    { href: "/journal", label: "Journal", icon: BookOpen },
    { href: "/assistant", label: "Assistant IA", icon: Brain },
    { href: "/achievements", label: "Achievements", icon: Trophy },
    { href: "/leaderboard", label: "Classement", icon: Trophy },
    { href: "/rappels", label: "Rappels", icon: Bell },
    { href: "/recherche", label: "Recherche", icon: Search },
    { href: "/statistiques", label: "Statistiques", icon: BarChart3 },
  ]

  const publicNavigationItems = [
    { href: "/connexion", label: "Connexion" },
    { href: "/inscription", label: "Inscription" },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CoachIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          )}

          {/* Public Navigation */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center gap-4">
              {publicNavigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive(item.href) ? "default" : "ghost"}>
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/rappels">
                  <Bell className="w-5 h-5" />
                  {notificationsCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      {notificationsCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            )}

            {/* User Menu */}
            {isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt={user.name || user.email} />
                      <AvatarFallback>
                        {user.name?.[0] || user.email[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name || "Utilisateur"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profil" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/statistiques" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Statistiques
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/achievements" className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Achievements
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-user.jpg" alt={user?.name || user?.email} />
                          <AvatarFallback>
                            {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name || "Utilisateur"}</p>
                          <p className="text-sm text-gray-600">{user?.email}</p>
                        </div>
                      </div>
                      
                      <nav className="flex flex-col gap-2">
                        {navigationItems.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Button
                                variant={isActive(item.href) ? "default" : "ghost"}
                                className="w-full justify-start gap-3"
                              >
                                {Icon && <Icon className="w-4 h-4" />}
                                {item.label}
                              </Button>
                            </Link>
                          )
                        })}
                      </nav>

                      <div className="border-t pt-4">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-red-600 hover:text-red-700"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </Button>
                      </div>
                    </>
                  ) : (
                    <nav className="flex flex-col gap-2">
                      {publicNavigationItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button
                            variant={isActive(item.href) ? "default" : "ghost"}
                            className="w-full justify-start"
                          >
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </nav>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
} 