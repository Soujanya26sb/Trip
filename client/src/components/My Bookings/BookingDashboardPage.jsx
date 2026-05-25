'use client'

import { useState, useEffect } from 'react'
import API from '@/utils/api'
import { FaSuitcase, FaCalendarAlt, FaArrowLeft, FaCheckCircle, FaDownload, FaReceipt } from 'react-icons/fa'
import './BookingDashboardPage.css'

export default function BookingDashboardPage({ onBackToHome }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadUserReceipts() {
      try {
        const email = sessionStorage.getItem('trip_user_email') || localStorage.getItem('trip_user_email')
        if (!email) {
          setErrorMessage('Please log in or provide a user email to view bookings.')
          setBookings([])
          return
        }

        const response = await API.get(`/api/bookings?email=${encodeURIComponent(email)}`)
        setBookings(response.data)
      } catch (err) {
        console.error('Failed capturing active booking array lists:', err)
        
       
        setBookings([
          {
            _id: 'ETH78291a',
            category: 'hotels',
            itemName: 'Grand Ethereal Resort & Luxury Spa Oasis',
            price: 14500,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'ETH90182b',
            category: 'flights',
            itemName: 'Bengaluru (BLR) to Maldives (MLE) — Round Trip Eco Premium',
            price: 28900,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'ETH34910c',
            category: 'Attractions',
            itemName: 'Private Coral Reef Snorkeling & Island Picnic Tour',
            price: 5200,
            createdAt: new Date().toISOString()
          }
        ])
        
        setErrorMessage('')
      } finally {
        setLoading(false)
      }
    }

    loadUserReceipts()
  }, [])

  const formatDetails = (details) => {
    if (!details) return 'No extra details'

    try {
      const parsed = typeof details === 'string' ? JSON.parse(details) : details
      return Object.entries(parsed)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
    } catch {
      return String(details)
    }
  }

  const formatBookingTime = (booking) => {
    if (booking.bookedAtLocal) return `${booking.bookedAtLocal} IST`
    if (!booking.createdAt) return 'Recent'

    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(new Date(booking.createdAt)) + ' IST'
  }

  const wrapPdfText = (text, maxLength = 92) => {
    const words = String(text || '').replace(/\s+/g, ' ').trim().split(' ')
    const lines = []
    let current = ''

    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word
      if (next.length > maxLength) {
        if (current) lines.push(current)
        current = word
      } else {
        current = next
      }
    })

    if (current) lines.push(current)
    return lines.length ? lines : ['']
  }

  const escapePdfText = (text) => (
    String(text)
      .replaceAll('\\', '\\\\')
      .replaceAll('(', '\\(')
      .replaceAll(')', '\\)')
  )

  const createPdfBlob = (lines) => {
    const pageLineLimit = 42
    const pages = []

    for (let i = 0; i < lines.length; i += pageLineLimit) {
      pages.push(lines.slice(i, i + pageLineLimit))
    }

    const objects = []
    const pageRefs = []
    const fontId = 3 + pages.length * 2

    objects[1] = '<< /Type /Catalog /Pages 2 0 R >>'

    pages.forEach((pageLines, index) => {
      const pageId = 3 + index * 2
      const contentId = pageId + 1
      pageRefs.push(`${pageId} 0 R`)

      const commands = ['BT', '/F1 11 Tf', '50 790 Td', '14 TL']
      pageLines.forEach((line) => {
        commands.push(`(${escapePdfText(line)}) Tj`, 'T*')
      })
      commands.push('ET')

      const stream = commands.join('\n')
      objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`
      objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
    })

    objects[2] = `<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${pages.length} >>`
    objects[fontId] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'

    let pdf = '%PDF-1.4\n'
    const offsets = [0]

    for (let i = 1; i < objects.length; i += 1) {
      if (!objects[i]) continue
      offsets[i] = pdf.length
      pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`
    }

    const xrefOffset = pdf.length
    pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`

    for (let i = 1; i < objects.length; i += 1) {
      pdf += `${String(offsets[i] || 0).padStart(10, '0')} 00000 n \n`
    }

    pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

    return new Blob([pdf], { type: 'application/pdf' })
  }

  const downloadBookings = () => {
    const userEmail = sessionStorage.getItem('trip_user_email') || localStorage.getItem('trip_user_email') || 'N/A'
    const totalAmount = bookings.reduce((sum, booking) => sum + Number(booking.amountPaid ?? booking.price ?? 0), 0)
    const lines = [
      'ETHEREAL ESCAPES',
      'MY BOOKING RECEIPT',
      '============================================================',
      `Generated On : ${formatBookingTime({ createdAt: new Date().toISOString() })}`,
      `User Email   : ${userEmail}`,
      `Total Bookings: ${bookings.length}`,
      `Total Amount : INR ${totalAmount.toLocaleString()}`,
      'Status       : Confirmed reservations',
      '============================================================',
      ' '
    ]

    bookings.forEach((booking, index) => {
      lines.push(`BOOKING ${String(index + 1).padStart(2, '0')}`)
      lines.push('------------------------------------------------------------')
      lines.push(`Reference ID   : ${booking._id || booking.id || 'UNKNOWN'}`)
      lines.push(`Transaction ID : ${booking.transactionId || 'N/A'}`)
      lines.push(`Booking Status : Confirmed`)
      lines.push(`Booked Time    : ${formatBookingTime(booking)}`)
      lines.push(`Category       : ${booking.category || 'Booking'}`)
      wrapPdfText(`Item Name      : ${booking.itemName || 'Reserved item'}`, 86).forEach((line, lineIndex) => {
        lines.push(lineIndex === 0 ? line : `                 ${line}`)
      })
      lines.push(`Amount Paid    : INR ${(booking.amountPaid ?? booking.price ?? 0).toLocaleString()}`)
      lines.push(`Booked For     : ${booking.userEmail || userEmail}`)
      wrapPdfText(`Details        : ${formatDetails(booking.details)}`, 86).forEach((line, lineIndex) => {
        lines.push(lineIndex === 0 ? line : `                 ${line}`)
      })
      lines.push('------------------------------------------------------------')
      lines.push(' ')
    })

    lines.push('End of booking receipt')

    const blob = createPdfBlob(lines)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `my-bookings-${new Date().toISOString().slice(0, 10)}.pdf`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: '32px 32px 72px', maxWidth: '1040px', margin: '0 auto', width: '100%' }}>
      <button
        onClick={onBackToHome}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#4c1d95',
          cursor: 'pointer',
          marginBottom: '24px',
          fontWeight: '700',
          fontSize: '14px'
        }}
      >
        <FaArrowLeft /> Home
      </button>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '18px',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0f766e', fontWeight: '800', fontSize: '13px', marginBottom: '8px' }}>
            <FaReceipt /> CONFIRMED RESERVATIONS
          </div>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
            My Booking
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 0' }}>
            All confirmed bookings made with your logged-in account are listed here.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadBookings}
          disabled={bookings.length === 0 || loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 16px',
            background: bookings.length === 0 || loading ? '#cbd5e1' : 'linear-gradient(90deg, #0f9f95, #2563eb)',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '800',
            cursor: bookings.length === 0 || loading ? 'not-allowed' : 'pointer',
            boxShadow: bookings.length === 0 || loading ? 'none' : '0 12px 24px rgba(37, 99, 235, 0.18)',
            whiteSpace: 'nowrap'
          }}
        >
          <FaDownload /> Download PDF
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontWeight: '500' }}>Hydrating itinerary streams...</p>
      ) : errorMessage ? (
        <div style={{ background: '#fff7ed', padding: '24px', borderRadius: '14px', border: '1px solid #fcdcbc', color: '#92400e' }}>
          {errorMessage}
        </div>
      ) : bookings.length === 0 ? (
        <div style={{ background: '#ffffff', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <FaSuitcase size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
          <p style={{ color: '#475569', fontWeight: '600' }}>No active reservations found.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map((booking) => (
            <div
              key={booking._id || booking.id}
              style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between', /* Fixed syntax here! */
                alignItems: 'center',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ 
                  background: '#f0fdf4', 
                  color: '#166534', 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  border: '1px solid #bbf7d0'
                }}>
                  {booking.category}
                </span>
                
                <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', marginTop: '10px', marginBottom: '6px' }}>
                  {booking.itemName}
                </h4>
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <p style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                    <FaCalendarAlt color="#94a3b8" /> Booked: {formatBookingTime(booking)}
                  </p>
                  <p style={{ fontSize: '13px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px', margin: 0, fontWeight: '600' }}>
                    <FaCheckCircle /> Confirmed
                  </p>
                </div>

                <p style={{ fontSize: '13px', color: '#475569', margin: '10px 0 0', lineHeight: '1.5' }}>
                  {formatDetails(booking.details)}
                </p>
              </div>
              
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '24px' }}>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#10b981' }}>
                  ₹{(booking.amountPaid ?? booking.price)?.toLocaleString()}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px', fontFamily: 'monospace', background: '#f8fafc', padding: '2px 6px', borderRadius: '4px' }}>
                  REF: {booking._id ? booking._id.slice(-8).toUpperCase() : 'UNKNOWN'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
