'use client'

import { useState } from 'react'
import AppShell from '@/components/app-shell/AppShell'
import AuthPage from '@/components/auth/AuthPage'
import { clearAuthSession, getInitialAuthSession } from '@/components/auth/authSession'
import { VIEW_KEYS } from '@/config/viewKeys'

export default function Home() {
  const [initialAuthSession] = useState(getInitialAuthSession)
  const [currentView, setCurrentView] = useState(VIEW_KEYS.HOME)
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthSession.isAuthenticated)
  const [user, setUser] = useState(initialAuthSession.user)

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    clearAuthSession()
    setUser(null)
    setIsAuthenticated(false)
    setCurrentView(VIEW_KEYS.HOME)
  }

  if (!isAuthenticated) {
    return <AuthPage onAuthenticated={handleAuthenticated} />
  }

  return (
    <AppShell
      currentView={currentView}
      user={user}
      onViewChange={setCurrentView}
      onLogout={handleLogout}
    />
  )
}
