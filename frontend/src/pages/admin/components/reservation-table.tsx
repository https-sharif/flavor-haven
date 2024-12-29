import { useState, useEffect } from "react";
import { Table } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import type { Reservation } from "../../../types";
import { displayMessage } from "../../../lib/displayMessage";
import { Trash2 } from "lucide-react";

interface ReservationTableProps {
    reservations: Reservation[];
    onStatusChange: (
        reservationId: string,
        status: Reservation["status"]
    ) => void;
}

export function ReservationTable({
    reservations,
    onStatusChange,
}: ReservationTableProps) {

    const [reservationsList, setReservations] = useState([] as Reservation[]);

    useEffect(() => {
        setReservations(reservations);
    }, [reservations]);

    const deleteReservation = async (reservationId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this reservation?"
        );
        if (confirmed) {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/reservation/delete-reservation/${reservationId}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to delete reservation");
                }
                displayMessage("Reservation deleted successfully");
                setReservations(reservations.filter((reservation) => reservation.id !== reservationId));
            } catch (error) {
                console.error("Error deleting reservation:", error);
                displayMessage("Failed to delete reservation.");
            }
        }
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th className="border border-gray-700 p-2">Reservation ID</th>
                    <th className="border border-gray-700 p-2">Customer</th>
                    <th className="border border-gray-700 p-2">Date</th>
                    <th className="border border-gray-700 p-2">Time</th>
                    <th className="border border-gray-700 p-2">Guests</th>
                    <th className="border border-gray-700 p-2">Status</th>
                    <th className="border border-gray-700 p-2">Actions</th>
                    <th className="border border-gray-700 p-2">Delete</th>
                </tr>
            </thead>
            <tbody>
                {reservationsList.map((reservation) => (
                    <tr key={reservation.id}>
                        <td className="font-mono border border-gray-700 text-center">
                            {reservation.id}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            {reservation.name}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            {reservation.date}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            {reservation.time}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            {reservation.guests}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            <select
                                value={reservation.status}
                                onChange={(e) =>
                                    onStatusChange(
                                        reservation.id,
                                        e.target.value as Reservation["status"]
                                    )
                                }
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
                        <td className="font-mono border border-gray-700 place-items-center">
                            <Trash2
                                className="cursor-pointer"
                                onClick={() =>
                                    deleteReservation(reservation.id)
                                }
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
