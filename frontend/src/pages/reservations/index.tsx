import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/card';
import { ReservationForm, type ReservationFormData } from './components/reservation-form';
import { ReservationSuccess } from './components/reservation-success';
import { displayMessage } from '../../lib/displayMessage';


export function ReservationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<{
    id: string;
    date: Date;
    time: string;
    guests: number;
  } | null>(null);
  const [randomTable, setRandomTable] = useState<number>(0);

  const handleSubmit = async (data: ReservationFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual reservation API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      setReservation({
        id: Math.random().toString(36).substr(2, 9),
        date: new Date(data.date),
        time: data.time,
        guests: data.guests,
      });
    } catch (error) {
      console.error('Failed to create reservation:', error);
      displayMessage('Failed to create reservation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    setRandomTable(Math.floor(Math.random() * 34) + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {!reservation ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
                  Make a <span className="text-primary">Reservation</span>
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Reserve your table at Flavor Haven for an unforgettable culinary experience.
                  For parties larger than 20, please contact us directly.
                </p>
              </div>

              <Card className="p-6">
                <ReservationForm onSubmit={handleSubmit} isLoading={isLoading} />
              </Card>

              <p className="mt-6 text-sm text-gray-500 text-center">
                By making a reservation, you agree to our cancellation policy.
                Cancellations must be made at least 4 hours in advance.
              </p>
            </>
          ) : (
            <ReservationSuccess reservationId={"3452342s"} randomTable={randomTable} {...reservation} />
          )}
        </motion.div>
      </div>
    </div>
  );
}