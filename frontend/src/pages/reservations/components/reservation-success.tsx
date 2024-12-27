import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../lib/utils';

interface ReservationSuccessProps {
  reservationId: string;
  date: Date;
  time: string;
  guests: number;
  table?: string;
}

export function ReservationSuccess({ 
  reservationId, 
  date, 
  time, 
  guests,
  table 
}: ReservationSuccessProps) {
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
            <Calendar className="w-6 h-6 text-primary" />
          </motion.div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for choosing Flavor Haven. We look forward to serving you.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span>{formatDate(date)}</span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>{time}</span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
        </div>

        {table && (
          <div className="pt-2 border-t border-gray-200">
            <span className="font-medium">Table Assignment: </span>
            <span>{table}</span>
          </div>
        )}
        
        <p className="text-sm text-gray-500 pt-2">
          Reservation ID: {reservationId}
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-primary/10 p-4 rounded-lg text-sm text-primary mb-4">
          Please arrive 10 minutes before your reservation time.
          For modifications, please contact us at least 4 hours in advance.
        </div>

        <Link to={`/track/reservation?id=${reservationId}`}>
          <Button className="w-full">Track Reservation</Button>
        </Link>
        
        <Link to="/menu">
          <Button variant="outline" className="w-full">
            View Menu
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}