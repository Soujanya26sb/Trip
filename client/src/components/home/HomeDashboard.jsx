import AppBanner from './AppBanner'
import BannerSection from './BannerSection'
import CouponCards from './CouponCards'
import DestinationSlider from './DestinationSlider'
import HeroSection from './HeroSection'
import HotelCards from './HotelCards'
import MomentsCards from './MomentsCards'
import PlacesCards from './PlacesCards'
import RecommendationTabs from './RecommendationTabs'

export default function HomeDashboard() {
  return (
    <div>
      <div className="hero-row-wrapper"><HeroSection /></div>
      <div className="section-row-wrapper"><CouponCards /></div>
      <div className="section-row-wrapper"><BannerSection /></div>
      <div className="section-row-wrapper"><DestinationSlider /></div>
      <div className="section-row-wrapper"><PlacesCards /></div>
      <div className="section-row-wrapper"><MomentsCards /></div>
      <div className="section-row-wrapper"><HotelCards /></div>
      <div className="section-row-wrapper"><AppBanner /></div>
      <div className="section-row-wrapper"><RecommendationTabs /></div>
    </div>
  )
}
