import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { displayMessage } from "../../lib/displayMessage";
import timeAgo from "../../lib/timeAgo";
import getPercentage from "../../lib/getPercentage";
import { Badge } from "../../components/ui/badge";

export function TrackOrderPage() {
    const { orderId: paramOrderId } = useParams<{ orderId: string }>();
    const [orderId, setOrderId] = useState(paramOrderId || "");
    const [orderStatus, setOrderStatus] = useState<null | {
        status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
        items: Array<{ name: string; quantity: number }>;
        estimatedDeliveryTime: number;
        createdAt: Date;
    }>(null);
    const [percentage, setPercentage] = useState(0);

    const handleTrack = async (e: React.FormEvent) => {
            setOrderStatus(null);
            e.preventDefault();

            if (!orderId) {
                displayMessage("Please enter an order ID.");
                return;
            }

            const response = await fetch(
                `http://localhost:3000/api/track/order/${orderId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                console.error("Failed to fetch order status");
                displayMessage(
                    "Failed to fetch order status. Please check the order ID and try again."
                );
                return;
            }

            const data = await response.json();

            setOrderStatus(data.order);
            const p = getPercentage(
                data.order.createdAt,
                data.order.estimatedDeliveryTime
            );
            if (p === 100) {
                setOrderStatus({
                    ...data.order,
                    status: "delivered",
                });
            } else if (data.order.status === "pending") {
                if (p >= 100) {
                    setOrderStatus({
                        ...data.order,
                        status: "delivered",
                    });
                } else if (p > 75) {
                    setOrderStatus({
                        ...data.order,
                        status: "ready",
                    });
                } else if (p > 20) {
                    setOrderStatus({
                        ...data.order,
                        status: "preparing",
                    });
                }
            }
            setPercentage(p);
        };

    useEffect(() => {
        const fetchData = async () => {
            if (paramOrderId) {
                setOrderId(paramOrderId);
                const response = await fetch(
                    `http://localhost:3000/api/track/order/${paramOrderId}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
    
                if (!response.ok) {
                    console.error("Failed to fetch order status");
                    displayMessage(
                        "Failed to fetch order status. Please check the order ID and try again."
                    );
                    return;
                }
    
                const data = await response.json();
    
                setOrderStatus(data.order);
                const p = getPercentage(
                    data.order.createdAt,
                    data.order.estimatedDeliveryTime
                );
                if (p === 100) {
                    setOrderStatus({
                        ...data.order,
                        status: "delivered",
                    });
                } else if (data.order.status === "pending") {
                    if (p >= 100) {
                        setOrderStatus({
                            ...data.order,
                            status: "delivered",
                        });
                    } else if (p > 75) {
                        setOrderStatus({
                            ...data.order,
                            status: "ready",
                        });
                    } else if (p > 20) {
                        setOrderStatus({
                            ...data.order,
                            status: "preparing",
                        });
                    }
                }
                setPercentage(p);
            }
        };
        fetchData();
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
                        Track Your <span className="text-primary">Order</span>
                    </h1>

                    <Card className="p-6 mb-8">
                        <form onSubmit={handleTrack} className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Enter your order ID"
                                    className="pl-10"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Track Order
                            </Button>
                        </form>
                    </Card>

                    {orderStatus && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Card className="p-6">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">
                                            Order Status
                                        </h2>
                                        <Badge variant={orderStatus.status}>
                                            {orderStatus.status}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-medium">Items:</h3>
                                        {orderStatus.items.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between"
                                                >
                                                    <span>{item.name}</span>
                                                    <span>
                                                        x{item.quantity}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {orderStatus.status === "cancelled" && (
                                        <div className="text-red-500">
                                            The refund will be processed within 3-5 business days.
                                        </div>
                                    )}

                                    {orderStatus.status === "delivered" && (
                                        <div className="text-green-500">
                                            Your order has been delivered. Enjoy your meal!
                                        </div>
                                    )}

                                    {orderStatus.status !== "delivered" &&
                                        orderStatus.status !== "cancelled" && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <Clock className="w-5 h-5" />
                                                    <span>
                                                        Estimated time:{" "}
                                                        {timeAgo(
                                                            orderStatus.createdAt,
                                                            orderStatus.estimatedDeliveryTime
                                                        )}{" "}
                                                        minutes
                                                    </span>
                                                </div>

                                                <div className="relative pt-6">
                                                    <div className="absolute left-0 top-0 w-full h-1 bg-gray-200 rounded">
                                                        <div
                                                            className="absolute left-0 top-0 h-full bg-primary rounded"
                                                            style={{
                                                                width: `${percentage}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
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
