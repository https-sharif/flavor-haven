import { motion } from 'framer-motion';

const team = [
  {
    name: 'Jaques Marin',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: "Michelin-starred Executive Chef with 20 years of expertise in crafting innovative and exceptional culinary experiences.",
  },
  {
    name: 'Marcus Laurent Jr.',
    role: 'Head Pastry Chef',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Following in his father\'s footsteps, Marcus Jr. brings modern techniques while honoring traditional flavors.',
  },
  {
    name: 'James Rodriguez',
    role: 'Sous Chef',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Sous Chef with a focus on precision and delivering exceptional culinary excellence.',
  },
  {
    name: 'Emma Thompson',
    role: 'Restaurant Manager',
    image: "https://img.freepik.com/premium-photo/confident-female-cafe-owner-strikes-pose-front-her-successful-restaurant_1000124-24258.jpg?",
    description: 'Ensures seamless service coordination and maintains our high standards of hospitality.',
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Meet Our <span className="text-primary">Team</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-primary mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}