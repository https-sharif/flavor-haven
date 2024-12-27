import { useEffect, useState } from "react";
import { Order } from "../../types/index";
import { OrderCard } from "./order-card";
import { useAuthStore } from "../../store/auth-store";
import LoginRequiredPage from "../errors/LoginRequiredPage";
import { EmptyOrders } from "./components/empty-orders";

export function OrderList() {
    const { user, isAuthenticated } = useAuthStore();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const sortOrder = (orders: Order[]) => {
        orders.sort((a, b) => {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        });
    };

    useEffect(() => {
      async function fetchOrders() {
        if (!user) return;
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3000/api/order/fetch-user-orders/${user.userId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          const data = await response.json();
          sortOrder(data.orders);
          setOrders(data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchOrders();
    }, [user]);
    

    if (!isAuthenticated) {
        return <LoginRequiredPage />;
    }

    return (
        <div className="mb-8 min-h-screen">
            <h2 className="text-4xl font-bold text-center mb-12 mt-6">
                Your <span className="text-primary">Orders</span>
            </h2>
            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <EmptyOrders />
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}
