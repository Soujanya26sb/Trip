'use client'

import React from 'react'
import './styles/sidebar.css'
import {
  FaBed,
  FaPlane,
  FaSuitcaseRolling,
  FaCar,
  FaMapMarkedAlt,
  FaUsers,
  FaRoute,
  FaClipboardCheck
} from 'react-icons/fa'

export default function Sidebar({ currentView, onViewChange }) {
  const menuItems = [
    { label: 'Hotels & Homes', view: 'hotels', icon: FaBed },
    { label: 'Flights', view: 'flights', icon: FaPlane },
    { label: 'Flight + Hotel', view: 'flight+hotel', icon: FaSuitcaseRolling },
    { label: 'Cars', view: 'cars', icon: FaCar },
    { label: 'Private Tours', view: 'private-tours', icon: FaRoute },
    { label: 'Group Tours', view: 'group-tours', icon: FaUsers },
    { label: 'Attractions & Tours', view: 'hotspots', icon: FaMapMarkedAlt },
    { label: 'My Booking', view: 'my-booking', icon: FaClipboardCheck }
  ]

  const handleMenuClick = (item) => {
    onViewChange?.(item.view)
    const event = new CustomEvent('switchSearchTab', { detail: item.label })
    window.dispatchEvent(event)
  }

  return (
    <aside className="custom-compact-sidebar">
      <div className="sidebar-menu-toggle-container">
        <button className="menu-toggle-icon" aria-label="Toggle Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="sidebar-menu-list">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.view}
              onClick={() => handleMenuClick(item)}
              className={`sidebar-menu-btn${currentView === item.view ? ' active' : ''}`}
            >
              <span className="sidebar-item-icon"><Icon /></span>
              <span className="sidebar-item-label">{item.label}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
