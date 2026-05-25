'use client'

import { useEffect } from 'react'
import { tabViewMap } from '@/config/tabViewMap'
import { featureViews } from '@/config/featureViews'
import { VIEW_KEYS } from '@/config/viewKeys'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import HomeDashboard from '@/components/home/HomeDashboard'
import './AppShell.css'

export default function AppShell({ currentView, onViewChange, onLogout }) {
  useEffect(() => {
    const handleTabChange = (event) => {
      const nextView = tabViewMap[event.detail]

      if (nextView) {
        onViewChange(nextView)
      }

      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('switchSearchTab', handleTabChange)
    return () => window.removeEventListener('switchSearchTab', handleTabChange)
  }, [onViewChange])

  const handleBackToHome = () => onViewChange(VIEW_KEYS.HOME)
  const ActiveFeatureView = featureViews[currentView]

  return (
    <div className="main-layout-root">
      <Navbar onLogout={onLogout} />

      <div className="main-body-split">
        <Sidebar currentView={currentView} onViewChange={onViewChange} />

        <div className="content-area-pane">
          {currentView === VIEW_KEYS.HOME && <HomeDashboard />}

          {ActiveFeatureView && (
            <div className="section-row-wrapper">
              <ActiveFeatureView onBackToHome={handleBackToHome} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
