import { motion } from 'framer-motion';
import { Award, Star, Trophy, Medal } from 'lucide-react';

const awards = [
  {
    icon: Star,
    title: 'Two Michelin Stars',
    year: '2022-Present',
    description: 'Recognized for consistent culinary excellence and innovation.',
  },
  {
    icon: Trophy,
    title: 'James Beard Award',
    year: '2023',
    description: 'Named Best New Restaurant, celebrating culinary creativity.',
  },
  {
    icon: Medal,
    title: 'Wine Spectator Award',
    year: '2023',
    description: 'Acknowledged for outstanding wine selection and pairing.',
  },
  {
    icon: Award,
    title: 'Forbes Travel Guide',
    year: '2024',
    description: 'Received a Four-Star Restaurant Rating for exceptional service.',
  },
];

export function AwardsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Our <span className="text-primary">Achievements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <award.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
              <p className="text-primary font-medium mb-2">{award.year}</p>
              <p className="text-gray-600">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}