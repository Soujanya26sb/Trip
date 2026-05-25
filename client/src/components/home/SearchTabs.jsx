'use client'

import { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  FaHotel, FaPlane, FaTrain, FaCar, FaMapMarkedAlt, FaSuitcase,
  FaSearch, FaChevronDown, FaUser, FaExchangeAlt, FaMinusCircle, FaPlusCircle,
  FaMapMarkerAlt, FaCheck
} from 'react-icons/fa'

const tabs = [
  { id: 'hotels',   label: 'Hotels & Homes',     icon: <FaHotel /> },
  { id: 'flights',  label: 'Flights',             icon: <FaPlane /> },
  { id: 'packages', label: 'Flight + Hotel',      icon: <FaSuitcase /> },
  { id: 'trains',   label: 'Trains',              icon: <FaTrain /> },
  { id: 'cars',     label: 'Cars',                icon: <FaCar /> },
  { id: 'tours',    label: 'Attractions & Tours', icon: <FaMapMarkedAlt /> },
]

const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0')
  const m = i % 2 === 0 ? '00' : '30'
  return `${h}:${m}`
})

const countries = [
  'Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola','Anguilla',
  'Antigua and Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan',
  'Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin',
  'Bermuda','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei',
  'Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cane Verde',
  'China','Colombia','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Egypt',
  'Finland','France','Germany','Ghana','Greece','Hungary','India','Indonesia',
  'Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kenya','Kuwait',
  'Malaysia','Mexico','Morocco','Nepal','Netherlands','New Zealand','Nigeria',
  'Norway','Pakistan','Philippines','Poland','Portugal','Qatar','Romania','Russia',
  'Saudi Arabia','Singapore','South Africa','South Korea','Spain','Sri Lanka',
  'Sweden','Switzerland','Thailand','Turkey','UAE','UK','USA','Vietnam'
]

const popularCities = {
  'Popular cities': ['New Delhi','Bangkok','Guangzhou','Mumbai','Chennai','Kuala Lumpur'],
  Asia:             ['New Delhi','Mumbai','Bengaluru','Goa','Dubai','Bangkok'],
  Europe:           ['London','Milan','Frankfurt','Paris','Zurich','Amsterdam'],
  'North America':  ['New York','San Francisco','Chicago','Los Angeles','Toronto','Vancouver'],
  Africa:           ['Mauritius','Nairobi','Cairo','Johannesburg','Cape Town','Mahe Island'],
}

const packageCities = {
  'Popular cities': ['New Delhi','Bangkok','Guangzhou','Mumbai','Chennai','Kuala Lumpur'],
  Asia: ['New Delhi','Mumbai','Bengaluru','Goa','Dubai','Bangkok'],
  Europe: ['London','Milan','Frankfurt','Paris','Zurich','Amsterdam'],
  'North America': ['New York','San Francisco','Chicago','Los Angeles','Toronto'],
  'South America': ['Sao Paulo','Rio de Janeiro','Bogota','Lima'],
  Africa: ['Mauritius','Nairobi','Cairo','Johannesburg'],
  Oceania: ['Melbourne','Sydney','Brisbane','Perth']
}

const formatDate = (date) => {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

export default function SearchTabs() {
  const [active, setActive] = useState('hotels')

  const [packageFrom, setPackageFrom] = useState('')
  const [packageTo, setPackageTo] = useState('Bangkok')

  const [packageDepart, setPackageDepart] = useState(new Date())
  const [packageReturn, setPackageReturn] = useState(
    new Date(new Date().setDate(new Date().getDate() + 5))
  )

  const [packageRooms, setPackageRooms] = useState(1)
  const [packageAdults, setPackageAdults] = useState(1)
  const [packageChildren, setPackageChildren] = useState(0)

  const [showPackageFrom, setShowPackageFrom] = useState(false)
  const [showPackageTo, setShowPackageTo] = useState(false)
  const [showPackageDates, setShowPackageDates] = useState(false)

  // HOTELS
  const [showDestinationPopup, setShowDestinationPopup] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState('')
  const [showHotelCalendar, setShowHotelCalendar]       = useState(false)
  const [hotelCheckIn, setHotelCheckIn]                 = useState(new Date())
  const [hotelCheckOut, setHotelCheckOut]               = useState(new Date(new Date().setDate(new Date().getDate() + 1)))
  const [showGuests, setShowGuests]                     = useState(false)
  const [rooms, setRooms]                               = useState(1)
  const [adults, setAdults]                             = useState(1)
  const [children, setChildren]                         = useState(0)

  // FLIGHTS
  const [flightType, setFlightType]                     = useState('roundtrip')
  const [showFromPopup, setShowFromPopup]               = useState(false)
  const [showToPopup, setShowToPopup]                   = useState(false)
  const [showFlightCalendar, setShowFlightCalendar]     = useState(false)
  const [showTravelerPopup, setShowTravelerPopup]       = useState(false)
  const [flightDepart, setFlightDepart]                 = useState(new Date())
  const [flightReturn, setFlightReturn]                 = useState(new Date(new Date().setDate(new Date().getDate() + 2)))
  const [travelClass, setTravelClass]                   = useState('Economy')
  const [selectedFrom, setSelectedFrom]                 = useState('')
  const [selectedTo, setSelectedTo]                     = useState('')
  const [flightAdults, setFlightAdults] = useState(1)
  const [flightChildren, setFlightChildren] = useState(0)
  const [flightInfants, setFlightInfants] = useState(0)
  const [packageTravelClass, setPackageTravelClass] = useState('Economy')

  const [trainFrom, setTrainFrom] = useState('')
  const [trainTo, setTrainTo] = useState('')
  const [trainDepart, setTrainDepart] = useState(new Date())
  const [trainReturn, setTrainReturn] = useState(new Date(new Date().setDate(new Date().getDate() + 2)))
  const [showTrainFrom, setShowTrainFrom] = useState(false)
  const [showTrainTo, setShowTrainTo] = useState(false)
  const [showTrainCalendar, setShowTrainCalendar] = useState(false)
  const [showTrainAge, setShowTrainAge] = useState(false)
  const [trainAgeRange, setTrainAgeRange] = useState('30-60')
  const [highSpeedOnly, setHighSpeedOnly] = useState(false)

  const [pickupLocation, setPickupLocation] = useState('')
  const [showPickupLocation, setShowPickupLocation] = useState(false)
  const [showPickupDateCalendar, setShowPickupDateCalendar] = useState(false)
  const [showDropoffDateCalendar, setShowDropoffDateCalendar] = useState(false)

  const [pickupDate, setPickupDate] = useState(new Date())

  const [dropoffDate, setDropoffDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 3))
  )

  // PACKAGE
  const [showPackageDetails, setShowPackageDetails]     = useState(false)

  // CARS
  const [carSubTab, setCarSubTab]           = useState('rentals')
  const [pickupTime, setPickupTime]         = useState('10:00')
  const [dropoffTime, setDropoffTime]       = useState('10:00')
  const [showPickupTime, setShowPickupTime] = useState(false)
  const [showDropoffTime, setShowDropoffTime] = useState(false)
  const [showCountry, setShowCountry]       = useState(false)
  const [showAge, setShowAge]               = useState(false)
  const [countrySearch, setCountrySearch]   = useState('')
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [ageRange, setAgeRange]             = useState('30-60')

  const filteredCountries = countries.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  )
  const ageRanges = ['18-24','25-29','30-60','61-65','66-69','70-74','75-99']

  const trainStations = {
    UK: ['London (Any)','Manchester (Any)','Birmingham (Any)','London Euston'],
    Japan: ['Tokyo (Any)','Osaka (Any)','Tokyo','Kyoto (Any)'],
    Italy: ['Milan (Any)','Rome (Any)','Milan Central','Florence (Any)'],
    France: ['Paris (Any)','Lyon (Any)','Nice (Any)','Paris Nord']
  }

  const carDestinations = [
    'Bangkok',
    'Los Angeles',
    'London',
    'Melbourne',
    'Tokyo',
    'Chicago',
    'New York',
    'Toronto'
  ]

  const wrapperRef = useRef(null)

  const handleSearchTrigger = (tabLabel) => {
    const event = new CustomEvent('switchSearchTab', { detail: tabLabel })
    window.dispatchEvent(event)
  }
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDestinationPopup(false)
        setShowHotelCalendar(false)
        setShowGuests(false)
        setShowFromPopup(false)
        setShowToPopup(false)
        setShowFlightCalendar(false)
        setShowTravelerPopup(false)
        setShowPackageDetails(false)
        setShowPackageFrom(false)
        setShowPackageTo(false)
        setShowPackageDates(false)
        setShowPickupTime(false)
        setShowDropoffTime(false)
        setShowPickupDateCalendar(false)
        setShowDropoffDateCalendar(false)
        setShowCountry(false)
        setShowAge(false)
        setShowTrainAge(false)
        setShowTrainFrom(false)
        setShowTrainTo(false)
        setShowTrainCalendar(false)
        setShowPickupLocation(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="sc-wrapper" ref={wrapperRef}>
      {/* DARK PILL TABS */}
      <div className="sc-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`sc-tab${active === tab.id ? ' active' : ''}`}
            onClick={() => setActive(tab.id)}
            suppressHydrationWarning
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* WHITE PANEL */}
      <div className="sc-panel">

        {/* HOTELS */}
        {active === 'hotels' && (
          <div className="sc-hotel-row-wrap">
            <div className="sc-row">

              {/* DESTINATION */}
              <div style={{ position: 'relative' }}>
                <div
                  className="sc-field sc-destination"
                  onClick={() => setShowDestinationPopup(v => !v)}
                >
                  <label>Destination</label>
                  <p className="sc-muted">{selectedDestination || 'City, airport, region, landmark or hotel name'}</p>
                </div>
                {showDestinationPopup && (
                  <div className="sc-destination-popup" onMouseDown={e => e.preventDefault()}>
                    <h4>Popular Destinations</h4>
                    <div className="sc-destination-grid">
                      {['Guangzhou','Bangkok','Phuket','Dubai','Pattaya','Shanghai','Singapore','Mumbai','Kuala Lumpur','Hong Kong'].map(city => (
                        <span key={city} onClick={() => { setSelectedDestination(city); setShowDestinationPopup(false) }}>
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="sc-sep" />

              {/* CHECK-IN */}
              <div className="sc-field sc-checkin" onClick={() => setShowHotelCalendar(!showHotelCalendar)}>
                <label>Check-in</label>
                <p>{formatDate(hotelCheckIn)}</p>
                {showHotelCalendar && (
                  <div className="flight-popup calendar-popup" onClick={e => e.stopPropagation()}>
                    <DatePicker
                      inline
                      monthsShown={1}
                      selected={hotelCheckIn}
                      startDate={hotelCheckIn}
                      endDate={hotelCheckOut}
                      onChange={dates => {
                        const [start, end] = dates
                        setHotelCheckIn(start)
                        setHotelCheckOut(end)
                        if (start && end) setShowHotelCalendar(false)
                      }}
                      selectsRange
                    />
                  </div>
                )}
              </div>

              <div className="sc-night">1 night</div>

              {/* CHECK-OUT */}
              <div className="sc-field sc-checkout">
                <label>Check-out</label>
                <p>
                  {hotelCheckOut
                    ? formatDate(hotelCheckOut)
                    : 'Select'}
                </p>
              </div>

              <div className="sc-sep" />

              {/* GUESTS */}
              <div className="sc-field sc-guests" onClick={() => setShowGuests(!showGuests)}>
                <label>Rooms and guests</label>
                <p>{rooms} room, {adults} adult, {children} children</p>
                <FaChevronDown className="sc-arrow" />
                {showGuests && (
                  <div className="sc-guest-popup">
                    {[['Rooms','',rooms,'rooms'],['Adults','18+ yrs',adults,'adults'],['Children','0-17 yrs',children,'children']].map(([t,s,val,key]) => (
                      <div className="sc-guest-row" key={t}>
                        <div><strong>{t}</strong>{s && <small>{s}</small>}</div>
                        <div className="sc-counter">
                          <FaMinusCircle onClick={e => { e.stopPropagation(); key==='rooms'&&rooms>1&&setRooms(r=>r-1); key==='adults'&&adults>1&&setAdults(a=>a-1); key==='children'&&children>0&&setChildren(c=>c-1) }} />
                          <span>{val}</span>
                          <FaPlusCircle onClick={e => { e.stopPropagation(); key==='rooms'&&setRooms(r=>r+1); key==='adults'&&setAdults(a=>a+1); key==='children'&&setChildren(c=>c+1) }} />
                        </div>
                      </div>
                    ))}
                    <button className="sc-done" onClick={e => { e.stopPropagation(); setShowGuests(false) }}>Done</button>
                  </div>
                )}
              </div>

            </div>
            <button 
  className="sc-search-btn" 
  suppressHydrationWarning 
  onClick={() => handleSearchTrigger('Hotels & Homes')}
>
  <FaSearch />&nbsp;Search
</button>
          </div>
        )}


{/* FLIGHTS */}
        {active === 'flights' && (
          <div className="sc-flight-wrap">
            <div className="sc-options">
              {['roundtrip','oneway'].map(t => (
                <label key={t}>
                  <input type="radio" name="ft" checked={flightType===t} onChange={() => setFlightType(t)} />
                  {t==='roundtrip' ? 'Return' : 'One-way'}
                </label>
              ))}
              <label><input type="checkbox" /> Direct</label>
            </div>

            <div className="sc-hotel-row-wrap" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '0' }}>
              <div className="sc-row" style={{ display: 'flex', flex: '1', width: '100%', alignItems: 'center' }}>
                
                {/* Leaving from */}
                <div 
                  className="flight-box" 
                  style={{ position: 'relative', flex: '1', padding: '10px 16px', border: 'none' }}
                  onClick={() => { setShowFromPopup(true); setShowToPopup(false); setShowFlightCalendar(false); setShowTravelerPopup(false) }}
                >
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>Leaving from</label>
                  <h4 style={{ margin: '0', fontSize: '10px', fontWeight: '400' }}>{selectedFrom || 'City or airport'}</h4>
                  {showFromPopup && (
                    <div className="flight-popup city-popup" onClick={e => e.stopPropagation()}>
                      <div className="city-scroll">
                        {Object.entries(popularCities).map(([section, cities]) => (
                          <div className="city-section" key={section}>
                            <h5>{section}</h5>
                            <div className="city-grid">
                              {cities.map(city => (
                                <span key={city} onMouseDown={e => { e.stopPropagation(); setSelectedFrom(city); setShowFromPopup(false) }}>{city}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="sc-swap" style={{ position: 'relative', zIndex: '2' }}><FaExchangeAlt /></div>

                {/* Going to */}
                <div 
                  className="flight-box" 
                  style={{ position: 'relative', flex: '1', padding: '10px 16px', border: 'none' }}
                  onClick={() => { setShowToPopup(true); setShowFromPopup(false); setShowFlightCalendar(false); setShowTravelerPopup(false) }}
                >
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>Going to</label>
                  <h4 style={{ margin: '0', fontSize: '10px', fontWeight: '400' }}>{selectedTo || 'City or airport'}</h4>
                  {showToPopup && (
                    <div className="flight-popup city-popup" onClick={e => e.stopPropagation()}>
                      <div className="city-scroll">
                        {Object.entries(popularCities).map(([section, cities]) => (
                          <div className="city-section" key={section}>
                            <h5>{section}</h5>
                            <div className="city-grid">
                              {cities.map(city => (
                                <span key={city} onMouseDown={e => { e.stopPropagation(); setSelectedTo(city); setShowToPopup(false) }}>{city}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="sc-sep" />

                {/* Dates Configuration (17/05/2026 — 19/05/2026) */}
                <div 
                  className="flight-date-box" 
                  style={{ position: 'relative', flex: '1.2', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', gap: '4px' }}
                  onClick={() => { setShowFlightCalendar(true); setShowFromPopup(false); setShowToPopup(false); setShowTravelerPopup(false) }}
                >
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>Depart</label>
                    <h4 style={{ margin: '0', fontSize: '10px', fontWeight: '400' }}>{formatDate(flightDepart) || '17/05/2026'}</h4>
                  </div>
                  <span className="date-dash" style={{ margin: '0 4px', alignSelf: 'center', paddingTop: '14px' }}>—</span>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>Return</label>
                    <h4 style={{ margin: '0', fontSize: '10px', fontWeight: '400' }}>{flightReturn ? formatDate(flightReturn) : '19/05/2026'}</h4>
                  </div>
                  {showFlightCalendar && (
                    <div className="flight-popup calendar-popup" onClick={e => e.stopPropagation()}>
                      <DatePicker
                        inline
                        monthsShown={1}
                        selected={flightDepart}
                        startDate={flightDepart}
                        endDate={flightReturn}
                        onChange={dates => {
                          const [start, end] = dates
                          setFlightDepart(start)
                          setFlightReturn(end)
                          if (start && end) setShowFlightCalendar(false)
                        }}
                        selectsRange
                      />
                    </div>
                  )}
                </div>

                <div className="sc-sep" />

                {/* Cabin Class and Travelers (1 adult · Economy) */}
                <div
                  className="flight-travelers"
                  style={{ position: 'relative', flex: '1.2', padding: '10px 16px', border: 'none', background: 'transparent', width: 'auto', justifyContent: 'space-between' }}
                  onClick={() => { setShowTravelerPopup(true); setShowFromPopup(false); setShowToPopup(false); setShowFlightCalendar(false) }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>Cabin & Travelers</label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ fontSize: '10px', fontWeight: '400', color: '#000' }}>
                        {flightAdults} adult
                        {flightChildren > 0 ? ` · ${flightChildren} ch` : ''}
                        {' · '}{travelClass}
                      </span>
                      <FaChevronDown style={{ marginLeft: '6px', fontSize: '11px', color: '#9ca3af' }} />
                    </div>
                  </div>

                  {showTravelerPopup && (
                    <div className="flight-popup traveler-popup" onClick={e => e.stopPropagation()}>
                      <div className="traveler-row">
                        <div><h5>Adults</h5><small>12+ years old</small></div>
                        <div className="traveler-counter">
                          <button onClick={e => { e.stopPropagation(); if (flightAdults > 1) setFlightAdults(flightAdults - 1) }}>-</button>
                          <span>{flightAdults}</span>
                          <button onClick={e => { e.stopPropagation(); setFlightAdults(flightAdults + 1) }}>+</button>
                        </div>
                      </div>
                      <div className="traveler-row">
                        <div><h5>Children</h5><small>2-11 years old</small></div>
                        <div className="traveler-counter">
                          <button onClick={e => { e.stopPropagation(); if (flightChildren > 0) setFlightChildren(flightChildren - 1) }}>-</button>
                          <span>{flightChildren}</span>
                          <button onClick={e => { e.stopPropagation(); setFlightChildren(flightChildren + 1) }}>+</button>
                        </div>
                      </div>
                      <div className="travel-class-section">
                        <h5>Class</h5>
                        {['Economy', 'Premium Economy', 'Business', 'First'].map(cls => (
                          <button
                            key={cls}
                            className={travelClass === cls ? 'active' : ''}
                            onClick={e => { e.stopPropagation(); setTravelClass(cls) }}
                          >
                            {cls}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
              <button 
                className="sc-search-btn" 
                suppressHydrationWarning 
                onClick={() => handleSearchTrigger('Flights')}
                style={{ height: '100%', minHeight: '56px', borderRadius: '0 12px 12px 0' }}
              >
                <FaSearch />&nbsp;Search
              </button>
            </div>
          </div>
        )}

        {/* TRAINS */}
        {active === 'trains' && (
          <div className="sc-train-wrap">
            <div className="sc-hotel-row-wrap">
              <div className="sc-row">
                <div
                  className="sc-field sc-tr-from"
                  onClick={() => setShowTrainFrom(!showTrainFrom)}
                  style={{ position: 'relative' }}
                >

                  <label>From</label>

                  <p>{trainFrom || 'Departure Station'}</p>

                  {showTrainFrom && (

                    <div className="flight-popup city-popup">

                      {Object.entries(trainStations).map(([country, stations]) => (

                        <div key={country} className="city-section">

                          <h5>{country}</h5>

                          <div className="city-grid">

                            {stations.map(station => (

                              <span
                                key={station}
                                onClick={() => {
                                  setTrainFrom(station)
                                  setShowTrainFrom(false)
                                }}
                              >
                                {station}
                              </span>

                            ))}

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </div>
                <div className="sc-swap"><FaExchangeAlt /></div>
                <div
                  className="sc-field sc-tr-to"
                  onClick={() => setShowTrainTo(!showTrainTo)}
                  style={{ position: 'relative' }}
                >

                  <label>To</label>

                  <p>{trainTo || 'Arrival Station'}</p>

                  {showTrainTo && (

                    <div className="flight-popup city-popup">

                      {Object.entries(trainStations).map(([country, stations]) => (

                        <div key={country} className="city-section">

                          <h5>{country}</h5>

                          <div className="city-grid">

                            {stations.map(station => (

                              <span
                                key={station}
                                onClick={() => {
                                  setTrainTo(station)
                                  setShowTrainTo(false)
                                }}
                              >
                                {station}
                              </span>

                            ))}

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </div>
                <div className="sc-sep" />
                <div
                  className="sc-field sc-tr-dep"
                  style={{ position: 'relative' }}
                  onClick={() => {
                    setShowTrainCalendar(true)
                    setShowTrainFrom(false)
                    setShowTrainTo(false)
                  }}
                >
                  <label>Departure time</label>
                  <p>{formatDate(trainDepart)}</p>
                  {showTrainCalendar && (
                    <div className="flight-popup calendar-popup" onClick={e => e.stopPropagation()}>
                      <DatePicker
                        inline
                        monthsShown={1}
                        selected={trainDepart}
                        startDate={trainDepart}
                        endDate={trainReturn}
                        onChange={dates => {
                          const [start, end] = dates
                          setTrainDepart(start)
                          setTrainReturn(end)
                          if (start && end) setShowTrainCalendar(false)
                        }}
                        selectsRange
                      />
                    </div>
                  )}
                </div>
                <div className="sc-sep" />
                <div className="sc-field sc-tr-ret"><label>Return time</label><p>{trainReturn ? formatDate(trainReturn) : 'Add return trip'}</p></div>
              </div>
              <button 
  className="sc-search-btn" 
  suppressHydrationWarning 
  onClick={() => handleSearchTrigger('Trains')}
>
  <FaSearch />&nbsp;Search
</button>
            </div>
            <div className="sc-train-footer">
              <label className="sc-drop-check"><input type="checkbox" checked={highSpeedOnly} onChange={() => setHighSpeedOnly(v => !v)} /> High-speed only</label>
              <span
                className="sc-pax-info"
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation()
                  setShowTrainAge(v => !v)
                  setShowTrainFrom(false)
                  setShowTrainTo(false)
                  setShowTrainCalendar(false)
                }}
              >
                <FaUser /> 1 passenger (aged {trainAgeRange}) <FaChevronDown />
                {showTrainAge && (
                  <div className="sc-age-dropdown train-age-dropdown" onClick={e => e.stopPropagation()}>
                    {ageRanges.map(a => (
                      <div
                        key={a}
                        className={`sc-age-item${trainAgeRange === a ? ' selected' : ''}`}
                        onClick={() => {
                          setTrainAgeRange(a)
                          setShowTrainAge(false)
                        }}
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                )}
              </span>
              <span className="sc-explore"><FaHotel /> Explore hotels ✓</span>
            </div>
          </div>
        )}

        {/* CARS */}
        {active === 'cars' && (
          <div className="sc-cars-wrap">
            <div className="sc-subtabs">
              <button className={`sc-subtab${carSubTab==='rentals'?' active':''}`} suppressHydrationWarning onClick={() => setCarSubTab('rentals')}>Car Rentals</button>
              <button className={`sc-subtab${carSubTab==='transfers'?' active':''}`} suppressHydrationWarning onClick={() => setCarSubTab('transfers')}>Airport Transfers</button>
            </div>

            {carSubTab === 'rentals' && (
              <>
                <label className="sc-drop-check"><input type="checkbox" /> Drop off at a different location</label>
                <div className="sc-hotel-row-wrap">
                  <div className="sc-row">
                    <div
                      className="sc-field sc-car-pickup"
                      onClick={() => setShowPickupLocation(!showPickupLocation)}
                      style={{ position: 'relative' }}
                    >
                      <label>Pick-up location</label>
                      <p className="sc-muted">
                        {pickupLocation || 'Airport, city, station, region, district...'}
                      </p>

                      {showPickupLocation && (

                        <div className="flight-popup city-popup">

                          <div className="city-grid">

                            {carDestinations.map(city => (

                              <span
                                key={city}
                                onClick={() => {
                                  setPickupLocation(city)
                                  setShowPickupLocation(false)
                                }}
                              >
                                {city}
                              </span>

                            ))}

                          </div>

                        </div>

                      )}

                    </div>
                    <div className="sc-sep" />
                    <div className="sc-field sc-car-date" style={{ position: 'relative' }}>
                      <label>Pick-up date</label>
                      <div className="sc-car-date-row">
                        <p onClick={e => { e.stopPropagation(); setShowPickupDateCalendar(v => !v); setShowDropoffDateCalendar(false); setShowPickupTime(false); setShowDropoffTime(false) }}>{formatDate(pickupDate)}</p>
                        <div className="sc-time-btn" onClick={e => { e.stopPropagation(); setShowPickupTime(!showPickupTime); setShowDropoffTime(false); setShowPickupDateCalendar(false); setShowDropoffDateCalendar(false) }}>
                          <span>{pickupTime}</span>
                          <FaChevronDown style={{ fontSize: '10px', color: '#6b7280' }} />
                        </div>
                      </div>
                      {showPickupDateCalendar && (
                        <div className="flight-popup calendar-popup" onClick={e => e.stopPropagation()}>
                          <DatePicker
                            inline
                            selected={pickupDate}
                            onChange={date => {
                              setPickupDate(date)
                              setShowPickupDateCalendar(false)
                            }}
                          />
                        </div>
                      )}
                      {showPickupTime && (
                        <div className="sc-time-dropdown">
                          {timeSlots.map(t => (
                            <div key={t} className={`sc-time-item${pickupTime===t?' selected':''}`} onClick={e => { e.stopPropagation(); setPickupTime(t); setShowPickupTime(false) }}>{t}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="sc-sep" />
                    <div className="sc-field sc-car-date" style={{ position: 'relative' }}>
                      <label>Drop-off date</label>
                      <div className="sc-car-date-row">
                        <p onClick={e => { e.stopPropagation(); setShowDropoffDateCalendar(v => !v); setShowPickupDateCalendar(false); setShowPickupTime(false); setShowDropoffTime(false) }}>{formatDate(dropoffDate)}</p>
                        <div className="sc-time-btn" onClick={e => { e.stopPropagation(); setShowDropoffTime(!showDropoffTime); setShowPickupTime(false); setShowPickupDateCalendar(false); setShowDropoffDateCalendar(false) }}>
                          <span>{dropoffTime}</span>
                          <FaChevronDown style={{ fontSize: '10px', color: '#6b7280' }} />
                        </div>
                      </div>
                      {showDropoffDateCalendar && (
                        <div className="flight-popup calendar-popup" onClick={e => e.stopPropagation()}>
                          <DatePicker
                            inline
                            selected={dropoffDate}
                            onChange={date => {
                              setDropoffDate(date)
                              setShowDropoffDateCalendar(false)
                            }}
                          />
                        </div>
                      )}
                      {showDropoffTime && (
                        <div className="sc-time-dropdown">
                          {timeSlots.map(t => (
                            <div key={t} className={`sc-time-item${dropoffTime===t?' selected':''}`} onClick={e => { e.stopPropagation(); setDropoffTime(t); setShowDropoffTime(false) }}>{t}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
  className="sc-search-btn sc-icon-only" 
  suppressHydrationWarning 
  onClick={() => handleSearchTrigger('Cars')}
>
  <FaSearch />
</button>
                </div>

                <div className="sc-car-footer">
                  <div className="sc-car-footer-item" style={{ position: 'relative' }}>
                    <span className="sc-footer-label">Driving licence issuing country/region</span>
                    <span className="sc-footer-val" onClick={() => { setShowCountry(!showCountry); setShowAge(false) }}>
                      <FaMapMarkerAlt style={{ color: '#6b7280', fontSize: '11px' }} /> {selectedCountry} <FaChevronDown style={{ fontSize: '10px' }} />
                    </span>
                    {showCountry && (
                      <div className="sc-country-dropdown">
                        <div className="sc-country-selected">
                          <span style={{ color: '#9ca3af', fontSize: '12px' }}>Selected</span>
                          <div className="sc-country-item sc-country-active">
                            {selectedCountry} <FaCheck style={{ color: '#3563ff', marginLeft: 'auto' }} />
                          </div>
                        </div>
                        <div className="sc-country-search">
                          <FaSearch style={{ color: '#9ca3af', fontSize: '11px' }} />
                          <input placeholder="Country or reg..." value={countrySearch} onChange={e => setCountrySearch(e.target.value)} onClick={e => e.stopPropagation()} />
                        </div>
                        <div className="sc-country-list">
                          {filteredCountries.map(c => (
                            <div key={c} className={`sc-country-item${c===selectedCountry?' sc-country-active':''}`} onClick={e => { e.stopPropagation(); setSelectedCountry(c); setShowCountry(false); setCountrySearch('') }}>{c}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sc-car-footer-item" style={{ position: 'relative' }}>
                    <span className="sc-footer-label">Age</span>
                    <span className="sc-footer-val" onClick={() => { setShowAge(!showAge); setShowCountry(false) }}>
                      {ageRange} <FaChevronDown style={{ fontSize: '10px' }} />
                    </span>
                    {showAge && (
                      <div className="sc-age-dropdown">
                        {ageRanges.map(a => (
                          <div key={a} className={`sc-age-item${ageRange===a?' selected':''}`} onClick={e => { e.stopPropagation(); setAgeRange(a); setShowAge(false) }}>{a}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {carSubTab === 'transfers' && (
              <div className="sc-hotel-row-wrap">
                <div className="sc-row">
                  <div className="sc-field sc-tf-from"><FaPlane className="sc-field-icon" /><label>Arrival airport</label></div>
                  <div className="sc-tf-arrow">→</div>
                  <div className="sc-field sc-tf-to"><FaMapMarkerAlt className="sc-field-icon" /><label>Enter a destination</label></div>
                  <div className="sc-sep" />
                  <div className="sc-field sc-tf-pax"><FaUser /><span>2 passengers</span><FaChevronDown /></div>
                </div>
                <button 
  className="sc-search-btn" 
  suppressHydrationWarning 
  onClick={() => handleSearchTrigger('Cars')}
>
  <FaSearch />&nbsp;Search
</button>
              </div>
            )}
          </div>
        )}

        {/* ATTRACTIONS & TOURS */}
        {active === 'tours' && (
          <div className="sc-hotel-row-wrap">
            <div className="sc-row">
              <div className="sc-field sc-tours-input">
                <p className="sc-muted">Search attractions or local attractions &amp; tours</p>
              </div>
            </div>
            <button 
  className="sc-search-btn" 
  suppressHydrationWarning 
  onClick={() => handleSearchTrigger('Attractions & Tours')}
>
  <FaSearch />&nbsp;Search
</button>
          </div>
        )}

        {/* FLIGHT + HOTEL */}
        {active === 'packages' && (
          <div className="sc-pkg-wrap">
            <div className="sc-options">
              <label><input type="radio" name="pkg" defaultChecked /> One-way</label>
              <label><input type="radio" name="pkg" /> Round-trip</label>
            </div>
            <div className="sc-hotel-row-wrap">
              <div className="sc-row">
                <div
                  className="sc-field sc-fl-from"
                  style={{ position: 'relative' }}
                  onClick={() => {
                    setShowPackageFrom(true)
                    setShowPackageTo(false)
                    setShowPackageDates(false)
                    setShowPackageDetails(false)
                  }}
                >
                  <label>From</label>
                  <p>{packageFrom || 'City or airport'}</p>
                  {showPackageFrom && (
                    <div className="flight-popup city-popup" onClick={e => e.stopPropagation()}>
                      <div className="city-scroll">
                        {Object.entries(packageCities).map(([section, cities]) => (
                          <div className="city-section" key={section}>
                            <h5>{section}</h5>
                            <div className="city-grid">
                              {cities.map(city => (
                                <span key={city} onMouseDown={e => { e.stopPropagation(); setPackageFrom(city); setShowPackageFrom(false) }}>{city}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="sc-swap"><FaPlane /></div>
                <div
                  className="sc-field sc-fl-to"
                  style={{ position: 'relative' }}
                  onClick={() => {
                    setShowPackageTo(true)
                    setShowPackageFrom(false)
                    setShowPackageDates(false)
                    setShowPackageDetails(false)
                  }}
                >
                  <label>To</label>
                  <p>{packageTo || 'City or airport'}</p>
                  {showPackageTo && (
                    <div className="flight-popup city-popup" onClick={e => e.stopPropagation()}>
                      <div className="city-scroll">
                        {Object.entries(packageCities).map(([section, cities]) => (
                          <div className="city-section" key={section}>
                            <h5>{section}</h5>
                            <div className="city-grid">
                              {cities.map(city => (
                                <span key={city} onMouseDown={e => { e.stopPropagation(); setPackageTo(city); setShowPackageTo(false) }}>{city}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="sc-sep" />
                <div
                  className="sc-field sc-pkg-dates"
                  style={{ position: 'relative' }}
                  onClick={() => {
                    setShowPackageDates(v => !v)
                    setShowPackageFrom(false)
                    setShowPackageTo(false)
                    setShowPackageDetails(false)
                  }}
                >
                  <div><label>Depart</label><p>{formatDate(packageDepart)}</p></div>
                  <span className="sc-night">{Math.max(1, Math.round((packageReturn - packageDepart) / (1000 * 60 * 60 * 24)))} nights</span>
                  <div><label>Return</label><p>{formatDate(packageReturn)}</p></div>
                  {showPackageDates && (
                    <div className="flight-popup calendar-popup" onClick={e => e.stopPropagation()}>
                      <DatePicker
                        inline
                        monthsShown={1}
                        selected={packageDepart}
                        startDate={packageDepart}
                        endDate={packageReturn}
                        onChange={dates => {
                          const [start, end] = dates
                          setPackageDepart(start)
                          setPackageReturn(end)
                          if (start && end) setShowPackageDates(false)
                        }}
                        selectsRange
                      />
                    </div>
                  )}
                </div>
                <div className="sc-sep" />

                {/* TRIP DETAILS */}
                <div
                  className="sc-field sc-pkg-details"
                  style={{ position: 'relative' }}
                  onClick={() => {
                    setShowPackageDetails(v => !v)
                    setShowPackageFrom(false)
                    setShowPackageTo(false)
                    setShowPackageDates(false)
                  }}
                >
                  <label>Trip details</label>
                  <p>{packageRooms} room{packageRooms > 1 ? 's' : ''}, {packageAdults} adult{packageAdults > 1 ? 's' : ''}{packageChildren > 0 ? `, ${packageChildren} children` : ''}, {packageTravelClass}</p>
                  {showPackageDetails && (
                    <div className="flight-popup traveler-popup" onClick={e => e.stopPropagation()}>
                      <div className="traveler-row">
                        <div>
                          <h5>Rooms</h5>
                        </div>
                        <div className="traveler-counter">
                          <button onClick={e => { e.stopPropagation(); if (packageRooms > 1) setPackageRooms(packageRooms - 1) }}>-</button>
                          <span>{packageRooms}</span>
                          <button onClick={e => { e.stopPropagation(); setPackageRooms(packageRooms + 1) }}>+</button>
                        </div>
                      </div>
                      <div className="traveler-row">
                        <div>
                          <h5>Adults</h5>
                          <small>18+ years old</small>
                        </div>
                        <div className="traveler-counter">
                          <button onClick={e => { e.stopPropagation(); if (packageAdults > 1) setPackageAdults(packageAdults - 1) }}>-</button>
                          <span>{packageAdults}</span>
                          <button onClick={e => { e.stopPropagation(); setPackageAdults(packageAdults + 1) }}>+</button>
                        </div>
                      </div>
                      <div className="traveler-row">
                        <div>
                          <h5>Children</h5>
                          <small>0-17 yrs</small>
                        </div>
                        <div className="traveler-counter">
                          <button onClick={e => { e.stopPropagation(); if (packageChildren > 0) setPackageChildren(packageChildren - 1) }}>-</button>
                          <span>{packageChildren}</span>
                          <button onClick={e => { e.stopPropagation(); setPackageChildren(packageChildren + 1) }}>+</button>
                        </div>
                      </div>
                      <select
                        value={packageTravelClass}
                        onChange={e => setPackageTravelClass(e.target.value)}
                        className="travel-class-select"
                      >
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                        <option>First</option>
                      </select>
                      <button className="traveler-done" suppressHydrationWarning onClick={() => setShowPackageDetails(false)}>Confirm</button>
                    </div>
                  )}
                </div>

              </div>
             <button 
  className="sc-search-btn" 
  suppressHydrationWarning 
  onClick={() => handleSearchTrigger('Flight + Hotel')}
>
  <FaSearch />&nbsp;Search
</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}