import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays, isAfter, isBefore, parse } from 'date-fns';
import { Calendar, Clock, Users } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useAuthStore } from '../../../store/auth-store';
import Loading from '../../../animations/loading';


const reservationSchema = z.object({
  date: z.string().refine((date) => {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    return isAfter(parsedDate, addDays(new Date(), -1)) && 
           isBefore(parsedDate, addDays(new Date(), 30));
  }, 'Please select a date within the next 30 days'),
  time: z.string().refine((time) => {
    const [hours] = time.split(':').map(Number);
    return hours >= 9 && hours < 22;
  }, 'Reservations are available between 9:00 AM and 10:00 PM'),
  guests: z.number()
    .min(1, 'Minimum 1 guest required')
    .max(20, 'Maximum 20 guests allowed'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email'),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .max(15, 'Please enter a valid phone number'),
  specialRequests: z.string().max(500, 'Special requests must be less than 500 characters').optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => void;
  isLoading?: boolean;
}

const timeSlots = Array.from({ length: 27 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour}:${minute}`;
});

export function ReservationForm({ onSubmit, isLoading }: ReservationFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
    },
  });

  const { user } = useAuthStore();


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
            <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              {...register('date')}
              placeholder="dd-mm-yyyy"
              className="pl-10"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              min={format(new Date(), 'dd-MM-yyyy')}
              max={format(addDays(new Date(), 30), 'dd-MM-yyyy')}
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
          {errors.time && (
            <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Number of Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="number"
              {...register('guests', { valueAsNumber: true })}
              className="pl-10"
              min={1}
              max={20}
            />
          </div>
          {errors.guests && (
            <p className="mt-1 text-sm text-red-500">{errors.guests.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <Input {...register('name')} defaultValue={user?.name}/>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input type="email" {...register('email')} defaultValue={user?.email}/>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <Input type="tel" {...register('phone')} defaultValue={user?.phone}/>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            {...register('specialRequests')}
            className="w-full h-32 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Let us know about any dietary restrictions or special occasions..."
          />
          {errors.specialRequests && (
            <p className="mt-1 text-sm text-red-500">{errors.specialRequests.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loading /> : 'Complete Reservation'}
      </Button>
    </form>
  );
}