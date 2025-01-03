import { useEffect, useState } from "react";
import { Order } from "../../types/index";
import { OrderCard } from "./components/order-card";
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
            `${import.meta.env.VITE_BACKEND_URL}/api/order/fetch-user-orders/${user.userId}`,
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
          (error as Error).message = "Failed to fetch orders";
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
                <div className="flex justify-center min-h-full">
                <div className="relative w-8 h-8 border-4 border-transparent border-r-primary rounded-full animate-spinCustom">
                  <div className="absolute inset-[-4px] border-4 border-transparent border-r-primary rounded-full animate-spinCustomBefore"></div>
                  <div className="absolute inset-[-8px] border-4 border-transparent border-r-primary rounded-full animate-spinCustomAfter"></div>
                </div>
              </div>
              
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
