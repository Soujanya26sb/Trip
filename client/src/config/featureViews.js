import HotspotsPage from '@/components/Attractions & Tours/HotspotsPage'
import CarsPage from '@/components/Cars/CarsPage'
import FlightHotelPage from '@/components/Flight + Hotel/FlightHotelPage'
import FlightsPage from '@/components/Flights/FlightsPage'
import GroupToursPage from '@/components/Group Tours/GroupToursPage'
import HotelsPage from '@/components/Hotels & Homes/HotelsPage'
import BookingDashboardPage from '@/components/My Bookings/BookingDashboardPage'
import PrivateToursPage from '@/components/Private Tours/PrivateToursPage'
import { VIEW_KEYS } from './viewKeys'

export const featureViews = {
  [VIEW_KEYS.ATTRACTIONS]: HotspotsPage,
  [VIEW_KEYS.HOTELS]: HotelsPage,
  [VIEW_KEYS.FLIGHTS]: FlightsPage,
  [VIEW_KEYS.FLIGHT_HOTEL]: FlightHotelPage,
  [VIEW_KEYS.CARS]: CarsPage,
  [VIEW_KEYS.PRIVATE_TOURS]: PrivateToursPage,
  [VIEW_KEYS.GROUP_TOURS]: GroupToursPage,
  [VIEW_KEYS.BOOKINGS]: BookingDashboardPage
}
