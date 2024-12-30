import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { StatsCards } from "./components/stats-cards";
import { OrderTable } from "./components/order-table";
import { ReservationTable } from "./components/reservation-table";
import type { FetchedOrders, Reservation } from "../../types";
import { UnauthorizedPage } from "../errors/UnauthorizedPage";
import { useAuthStore } from "../../store/auth-store";
import LoginRequiredPage from "../errors/LoginRequiredPage";
import { displayMessage } from "../../lib/displayMessage";

export function AdminDashboard() {
    const [orders, setOrders] = useState([] as FetchedOrders[]);
    const [reservations, setReservations] = useState([] as Reservation[]);
    const [activeTab, setActiveTab] = useState<"orders" | "reservations">(
        "orders"
    );
    const [userCount, setUserCount] = useState(0);
    const [revenue, setRevenue] = useState(0);

    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        async function fetchOrders() {
            if (!user) return;
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/order/fetch-all-orders`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();

                data.orders.forEach((order: FetchedOrders) => {
                    setRevenue((prev) => prev + order.total);
                });

                data.orders.sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setOrders(data.orders);
            }
            catch (error) {
                (error as Error).message = "Failed to fetch orders";
            }
        }

        async function fetchReservations() {
            try {
              const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/reservation/fetch-all-reservation`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }
              );
              if (!response.ok) {
                throw new Error("Failed to fetch reservations");
              }
              const data = await response.json();

              data.reservations.sort((a: { date: string; }, b: { date: string; }) => new Date(a.date).getTime() - new Date(b.date).getTime());

              setReservations(data.reservations);
            } catch (error) {
                (error as Error).message = "Failed to fetch reservations";
            }
          }

        async function fetchUserCount() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/get-all-users`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user count");
                }

                const data = await response.json();
                setUserCount(data.users.length);
            } catch (error) {
                (error as Error).message = "Failed to fetch user count";
            }
        }

        fetchOrders();
        fetchReservations();
        fetchUserCount();
    }, [user]);

    const handleOrderStatusChange = async (
        orderId: string,
        status: FetchedOrders["status"]
    ) => {
        setOrders(
            orders.map((order) =>
                order.id === orderId ? { ...order, status } : order
            )
        );

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/order/update-order/${orderId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update order");
        }
        else {
          displayMessage("Order updated successfully");
        }

    };

    const handleReservationStatusChange = async (
        reservationId: string,
        status: Reservation["status"]
    ) => {
        setReservations(
            reservations.map((reservation) =>
                reservation.id === reservationId
                    ? { ...reservation, status }
                    : reservation
            )
        );

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/reservation/update-reservation/${reservationId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update reservation");
        }
        else {
          displayMessage("Reservation updated successfully");
        }
    };

    if (!isAuthenticated) {
        return <LoginRequiredPage />;
    } else if (user?.role !== "admin") {
        return <UnauthorizedPage />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold mb-8">
                        Admin <span className="text-primary">Dashboard</span>
                    </h1>

                    <StatsCards
                        totalOrders={orders.length}
                        totalReservations={reservations.length}
                        totalCustomers={userCount}
                        totalRevenue={revenue}
                    />

                    <div className="mt-12">
                        {activeTab === "orders" ? (
                            <Button
                                variant="outline"
                                onClick={() => setActiveTab("orders")}
                                className="mr-4"
                            >
                                Orders
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={() => setActiveTab("orders")}
                                className="mr-4"
                            >
                                Orders
                            </Button>
                        )}
                        {activeTab === "reservations" ? (
                            <Button
                                variant="outline"
                                onClick={() => setActiveTab("reservations")}
                                className="mr-4"
                            >
                                Reservations
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={() => setActiveTab("reservations")}
                                className="mr-4"
                            >
                                Reservations
                            </Button>
                        )}

                        <h1 className="text-4xl font-bold my-4 ml-4">
                            {activeTab == "orders" ? "Orders" : "Reservations"}
                        </h1>

                        {activeTab === "orders" && (
                            <OrderTable
                                orders={orders}
                                onStatusChange={handleOrderStatusChange}
                            />
                        )}
                        {activeTab === "reservations" && (
                            <ReservationTable
                                reservations={reservations}
                                onStatusChange={handleReservationStatusChange}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
