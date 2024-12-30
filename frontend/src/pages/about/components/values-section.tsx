import { motion } from 'framer-motion';
import { Leaf, Award, Heart, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We source our ingredients from local, sustainable farms and producers.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to maintaining the highest standards in culinary artistry.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Every dish is created with love and attention to detail.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Constantly evolving our menu while respecting traditional techniques.',
  },
];

export function ValuesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our <span className="text-primary">Values</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}