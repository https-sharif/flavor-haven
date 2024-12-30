import { motion } from 'framer-motion';
import { CheckCircle, Clock, Receipt } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';
import { displayMessage } from '../../../lib/displayMessage';

interface OrderSuccessProps {
  orderId: string;
  estimatedTime: number;
}

export function OrderSuccess({ orderId, estimatedTime }: OrderSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="mb-8">
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-green-100 p-6 rounded-full"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -right-2 -bottom-2 bg-white p-2 rounded-full shadow-lg"
          >
            <Receipt className="w-6 h-6 text-primary" />
          </motion.div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your order. We'll start preparing it right away.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <Clock className="w-5 h-5" />
          <span className="font-medium">Estimated Time: {estimatedTime} minutes</span>
        </div>
        <p 
          className="text-sm text-gray-600 cursor-pointer" 
          onClick={() => {
            navigator.clipboard.writeText(orderId)
            displayMessage("Order ID copied to clipboard")
          }}
        >
          Order ID: {orderId}
        </p>
      </div>

      <div className="space-y-3 ">
        <Link to={`/track-order/${orderId}`}>
          <Button className="w-4/5">Track Order</Button>
        </Link>
        <Link to="/menu">
          <Button variant="outline" className="w-4/5 mt-4">
            Order Something Else
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}