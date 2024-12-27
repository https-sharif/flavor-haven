import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Clock, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { useAuthStore } from '../../store/auth-store';
import LoginRequiredPage from '../errors/LoginRequiredPage';

const reservationSchema = z.object({
  date: z.string(),
  time: z.string(),
  guests: z.number().min(1).max(20),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  specialRequests: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

const timeSlots = [
  '17:00', '17:30', '18:00', '18:30', '19:00',
  '19:30', '20:00', '20:30', '21:00', '21:30',
];

export function ReservationsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
  });

  const { isAuthenticated } = useAuthStore();

  const onSubmit = async (data: ReservationForm) => {
    console.log(data);
    // TODO: Implement reservation submission
  };

  if (!isAuthenticated) {
    return <LoginRequiredPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8">
            Make a <span className="text-primary">Reservation</span>
          </h1>

          <Card className="p-6">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center ${step < currentStep ? 'text-primary' : ''}`}
              >
                <div className={`w-8 aspect-square h-8 rounded flex items-center justify-center ${
                step === currentStep ? 'bg-primary text-black' :
                step < currentStep ? 'bg-primary/20' : 'bg-gray-200'
                }`}>
                {step}
                </div>
                {step < 3 && (
                <div className={`w-full h-1 ${
                  step < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`} />
                )}
              </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="date"
                        {...register('date')}
                        className="pl-10"
                        min={format(new Date(), 'yyyy-MM-dd')}
                      />
                    </div>
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        {...register('time')}
                        className="w-full pl-10 h-10 rounded-md border border-gray-300"
                      >
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="number"
                        {...register('guests', { valueAsNumber: true })}
                        className="pl-10"
                        min="1"
                        max="20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input {...register('name')} />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" {...register('email')} />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input type="tel" {...register('phone')} />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Special Requests</label>
                    <textarea
                      {...register('specialRequests')}
                      className="w-full h-32 rounded-md border border-gray-300 p-3"
                      placeholder="Any dietary restrictions or special occasions?"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                ) : <Button 
                      type="button"
                      variant='outline'
                      className='invisible'
                    ></Button>}
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    Complete Reservation
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}