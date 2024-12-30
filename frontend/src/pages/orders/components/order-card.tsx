import { Clock } from "lucide-react";
import { Order } from "../../../types/index";
import { motion } from "framer-motion";
import { displayMessage } from "../../../lib/displayMessage";

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const getStatusColor = (status: Order["status"]) => {
        const colors: { [key in Order["status"]]: string } = {
            pending: "bg-yellow-100 text-yellow-800",
            preparing: "bg-blue-100 text-blue-800",
            ready: "bg-green-100 text-green-800",
            delivered: "bg-gray-100 text-gray-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mx-4 mb-4 sm:mx-6 md:mx-8 lg:mx-12"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <div className="mb-2 sm:mb-0">
                <h3 
                    className="text-lg font-semibold cursor-pointer" 
                    onClick={() => {
                        navigator.clipboard.writeText(order.id)
                        displayMessage("Order ID copied to clipboard")
                    }}
                >
                    Order #{order.id}
                </h3>
                <p className="text-sm text-gray-500">
                <Clock className="inline-block w-4 h-4 mr-1" />
                {new Date(order.createdAt).toLocaleDateString()}
                </p>
            </div>
            <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
                )}`}
            >
                {order.status.charAt(0).toUpperCase() +
                order.status.slice(1)}
            </span>
            </div>

            <div className="space-y-2">
            {order.items.map((item) => (
                <div
                key={item.id}
                className="flex justify-between items-center"
                >
                <div>
                    <span className="font-medium">
                    {item.quantity}x
                    </span>{" "}
                    {item.name}
                    {item.notes && (
                    <p className="text-sm text-gray-500 ml-6">
                        {item.notes}
                    </p>
                    )}
                </div>
                <span className="text-gray-700">
                    &#2547; {(item.price * item.quantity).toFixed(2)}
                </span>
                </div>
            ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold flex items-center">
                &#2547; &nbsp;
                {order.total.toFixed(2)}
                </span>
            </div>
            {order.estimatedDeliveryTime && (
                <p className="text-sm text-gray-500 mt-2">
                Estimated delivery: {order.estimatedDeliveryTime}
                </p>
            )}
            </div>
        </motion.div>
    );
}
