import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Users, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { displayMessage } from "../../lib/displayMessage";
import findTable from "../../lib/tablePlan";

export function TrackReservationPage() {
    const { reservationId: paramOrderId } = useParams<{
        reservationId: string;
    }>();
    const [reservationId, setReservationId] = useState(paramOrderId || "");
    const [reservation, setReservation] = useState<null | {
        status: "pending" | "confirmed" | "cancelled";
        date: string;
        time: string;
        guests: number;
        table: string;
    }>(null);
    const [table, setTable] = useState<string | null>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setReservation(null);

        if (!reservationId) {
            displayMessage("Please enter a reservation ID");
        }

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/track/reservation/${reservationId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setReservation(data.reservation);
            setTable(findTable(data.reservation.table));
        } else {
            displayMessage("Reservation not found. Please check the reservation ID and try again.");
        }
    };

    useEffect(() => {
        const fetchReservation = async () => {
            if (paramOrderId) {
                setReservationId(paramOrderId);
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/track/reservation/${paramOrderId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setReservation(data.reservation);
                    setTable(findTable(data.reservation.table));
                } else {
                    displayMessage("Reservation not found");
                }
            }
        };

        fetchReservation();
    }, [paramOrderId]);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Track Your{" "}
                        <span className="text-primary">Reservation</span>
                    </h1>

                    <Card className="p-6 mb-8">
                        <form onSubmit={handleTrack} className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Enter your reservation ID"
                                    className="pl-10"
                                    value={reservationId}
                                    onChange={(e) =>
                                        setReservationId(e.target.value)
                                    }
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Track Reservation
                            </Button>
                        </form>
                    </Card>

                    {reservation && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Card className="p-6">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">
                                            Reservation Status
                                        </h2>
                                        <span
                                            className={`px-4 py-1 rounded-full ${
                                                reservation.status ===
                                                "confirmed"
                                                    ? "bg-green-100 text-green-800"
                                                    : reservation.status ===
                                                      "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {reservation.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <span>{reservation.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-primary" />
                                            <span>{reservation.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-primary" />
                                            <span>
                                                {reservation.guests} guests
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                Table:
                                            </span>
                                            <span>{reservation.table} ({table})</span>
                                        </div>
                                    </div>

                                    {reservation.status === "confirmed" && (
                                        <div className="bg-green-50 p-4 rounded-md">
                                            <p className="text-green-800">
                                                Your table is confirmed! Please
                                                arrive 10 minutes before your
                                                reservation time.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
