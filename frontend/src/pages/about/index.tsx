import { motion } from 'framer-motion';
import { HistorySection } from './components/history-section';
import { ValuesSection } from './components/values-section';
import { JourneySection } from './components/journey-section';
import { TeamSection } from './components/team-section';
import { AwardsSection } from './components/awards-section';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] flex items-center justify-center"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            A legacy of culinary excellence and exceptional dining experiences
          </p>
        </div>
      </motion.div>

      <HistorySection />
      <JourneySection />
      <TeamSection />
      <ValuesSection />
      <AwardsSection />
    </div>
  );
}