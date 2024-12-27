import { motion } from 'framer-motion';

export function MenuHero() {
  return (
    <div className="relative h-[40vh] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center text-white"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Our Menu</h1>
        <p className="text-xl max-w-2xl mx-auto px-4">
          Discover our carefully curated selection of culinary masterpieces
        </p>
      </motion.div>
    </div>
  );
}