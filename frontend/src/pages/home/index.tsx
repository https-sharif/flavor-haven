import { HeroSection } from './components/hero-section';
import { PopularDishes } from './components/popular-dishes';
import { ChefShowcase } from './components/chef-showcase';
import { ReviewCarousel } from './components/review-carousel';
import { LocationSection } from './components/location-section';
import { ReservationSection } from './components/reservation-section';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PopularDishes />
      <ChefShowcase />
      <ReservationSection />
      <ReviewCarousel />
      <LocationSection />
    </div>
  );
}