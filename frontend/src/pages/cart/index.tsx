import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cart-store";
import { CartItems } from "./components/cart-items";
import { DeliveryForm } from "./components/delivery-form";
import { PaymentForm } from "./components/payment-form";
import { OrderSummary } from "./components/order-summary";
import { EmptyCart } from "./components/empty-cart";
import { useAuthStore } from "../../store/auth-store";
import LoginRequiredPage from "../errors/LoginRequiredPage";
import { displayMessage } from "../../lib/displayMessage";
import menuItems from "../menu/menuList";
import { OrderSuccess } from "./components/order-succes";

const DELIVERY_FEE = 120;

export function CartPage() {
    const [step, setStep] = useState<
        "cart" | "delivery" | "payment" | "success"
    >("cart");
    const { items, updateQuantity, removeItem, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const [orderId, setOrderId] = useState("");

    const handleDeliverySubmit = () => {
        setStep("payment");
    };

    const calculateEstimatedDeliveryTime = () => {
        let deliveryTime = 0;
        items.forEach((item) => {
            const menuItem = menuItems.find(
                (menuItem) => menuItem.id === item.id
            );
            if (menuItem && menuItem.eta > deliveryTime) {
                deliveryTime = menuItem.eta;
            }
        });
        return deliveryTime;
    };

    const deliveryTime = calculateEstimatedDeliveryTime();

    const handlePaymentSubmit = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/order/create-order",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user?.userId,
                        name: user?.name,
                        items,
                        total: items.reduce((total, item) => total + item.price * item.quantity, 0),
                        status: "pending",
                        createdAt: new Date(),
                        estimatedDeliveryTime: deliveryTime,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create order");
            } else {
                const data = await response.json();
                setOrderId(data.order.id);
            }

            clearCart();
            setStep("success");
            displayMessage("Payment successful, your order is on the way!");
        } catch (error) {
            console.error("Payment failed:", error);
        }
    };

    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <LoginRequiredPage />;
    }

    if (items.length === 0 && step === "cart") {
        return <EmptyCart />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">
                        {step === "cart" && "Shopping Cart"}
                        {step === "delivery" && "Delivery Information"}
                        {step === "payment" && "Payment"}
                    </h1>

                    {step !== "success" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <motion.div
                                className="lg:col-span-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {step === "cart" && (
                                    <CartItems
                                        items={items}
                                        onUpdateQuantity={updateQuantity}
                                        onRemoveItem={removeItem}
                                    />
                                )}

                                {step === "delivery" && (
                                    <DeliveryForm
                                        onSubmit={handleDeliverySubmit}
                                    />
                                )}

                                {step === "payment" && (
                                    <PaymentForm
                                        onSubmit={handlePaymentSubmit}
                                    />
                                )}
                            </motion.div>

                            <div className="lg:col-span-1">
                                <OrderSummary
                                    items={items}
                                    deliveryFee={DELIVERY_FEE}
                                />

                                {step === "cart" && (
                                    <button
                                        onClick={() => setStep("delivery")}
                                        className="w-full mt-4 bg-primary text-black py-3 rounded-lg font-semibold"
                                    >
                                        Proceed to Delivery
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {step === "success" && (
                    <OrderSuccess orderId={orderId} estimatedTime={deliveryTime} />
                )}
            </div>
        </div>
        // </div>
    );
}
