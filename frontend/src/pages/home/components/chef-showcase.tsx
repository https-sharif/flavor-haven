import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const chefs = [
  {
    id: 1,
    name: 'Jacques Marin',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Michelin-starred chef with 20 years of culinary excellence',
  },
  {
    id: 2,
    name: 'Marcus Laurent Jr.',
    role: 'Head Pastry Chef',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Award-winning pastry artist specializing in French desserts',
  },
  {
    id: 3,
    name: 'James Rodriguez',
    role: 'Sous Chef',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Expert in Mediterranean and fusion cuisine',
  },
];

export function ChefShowcase() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our <span className="text-primary">Master Chefs</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border min-h-[500px] border-primary/20 overflow-hidden">
                <div className="relative group">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-80 object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-primary mt-2">{chef.name}</CardTitle>
                  <p className="text-gray-400">{chef.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{chef.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}