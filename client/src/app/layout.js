export const metadata = {
  title: 'Trip Clone',
  description: 'Trip.com Clone',
}

import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
