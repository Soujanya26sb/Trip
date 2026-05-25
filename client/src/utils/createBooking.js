import API from './api'

export async function createBooking({
  itemName,
  price,
  category,
  details
}) {
  const payload = {
    email:
      sessionStorage.getItem('trip_user_email') ||
      localStorage.getItem('trip_user_email') ||
      'guest@trip.com',
    itemName,
    price,
    category,
    details,
    transactionId: 'TXN-' + Date.now()
  }

  const response = await API.post('/api/bookings', payload)

  return response.data
}
