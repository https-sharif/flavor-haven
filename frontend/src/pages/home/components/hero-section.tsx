import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center text-white px-4"
      >
        <motion.img
          src="/public/assets/logo.svg"
          alt="Flavor Haven Logo"
          className="w-[500px] mx-auto mb-8"
          style={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{
            repeat: 1,
            repeatType: "reverse",
            duration: 2,
          }}
        />

        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Experience culinary excellence in an atmosphere of unparalleled sophistication
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" to="/reservations">
            Book a Table
          </Button>
          <Button size="lg" variant="outline" to="/menu">
            View Menu
          </Button>
        </div>
      </motion.div>
    </div>
  );
}