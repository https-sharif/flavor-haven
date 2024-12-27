import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';

export function EmptyCart() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center"
    >
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <ShoppingBag className="w-12 h-12 text-primary" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Looks like you haven't added anything to your cart yet.
        Browse our menu to discover exquisite dishes!
      </p>
      
      <Link to="/menu">
        <Button size="lg" className="font-semibold">
          Browse Menu
        </Button>
      </Link>
    </motion.div>
  );
}