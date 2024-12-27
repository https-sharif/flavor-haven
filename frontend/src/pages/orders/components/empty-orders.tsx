import { motion } from 'framer-motion';
import { Receipt, UtensilsCrossed } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';

export function EmptyOrders() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center"
    >
      <div className="relative mb-8">
        <div className="bg-primary/10 p-6 rounded-full">
          <Receipt className="w-12 h-12 text-primary" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg"
        >
          <UtensilsCrossed className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">No Orders Yet</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        You haven't placed any orders with us yet. 
        Start your culinary journey by exploring our exquisite menu!
      </p>
      
      <div className="space-x-4">
        <Link to="/menu">
          <Button size="lg" className="font-semibold">
            Browse Menu
          </Button>
        </Link>
        <Link to="/reservations">
          <Button size="lg" variant="outline" className="font-semibold">
            Make a Reservation
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}