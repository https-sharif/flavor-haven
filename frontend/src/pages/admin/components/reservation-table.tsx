import { formatDate } from '../../../lib/utils';
import { Table } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import type { Reservation } from '../../../types';

interface ReservationTableProps {
  reservations: Reservation[];
  onStatusChange: (reservationId: string, status: Reservation['status']) => void;
}

export function ReservationTable({ reservations, onStatusChange }: ReservationTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Time</th>
          <th>Guests</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td className="font-mono border border-gray-700 text-center">{reservation.id.slice(0, 8)}</td>
            <td className="font-mono border border-gray-700 text-center">{reservation.userId}</td>
            <td className="font-mono border border-gray-700 text-center">{formatDate(reservation.date)}</td>
            <td className="font-mono border border-gray-700 text-center">{reservation.time}</td>
            <td className="font-mono border border-gray-700 text-center">{reservation.guests}</td>
            <td className="font-mono border border-gray-700 text-center">
              <select
                value={reservation.status}
                onChange={(e) => onStatusChange(reservation.id, e.target.value as Reservation['status'])}
                className="w-4/5 h-full border border-gray-700 rounded p-1"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
            <td className="font-mono border border-gray-700 text-center">
              <Badge variant={reservation.status}>
                {reservation.status}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}