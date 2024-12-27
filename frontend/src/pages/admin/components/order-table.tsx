import { Table } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import type { FetchedOrders } from "../../../types";
import { Trash2 } from "lucide-react";

interface OrderTableProps {
    orders: FetchedOrders[];
    onStatusChange: (orderId: string, status: FetchedOrders["status"]) => void;
}

export function OrderTable({ orders, onStatusChange }: OrderTableProps) {
    return (
        <Table className="w-full">
            <thead>
                <tr>
                    <th className="border border-gray-700 p-2">Order ID</th>
                    <th className="border border-gray-700 p-2">Customer</th>
                    <th className="border border-gray-700 p-2">Items</th>
                    <th className="border border-gray-700 p-2">Total</th>
                    <th className="border border-gray-700 p-2">Status</th>
                    <th className="border border-gray-700 p-2">Date</th>
                    <th className="border border-gray-700 p-2">Actions</th>
                    <th className="border border-gray-700 p-2">Delete</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td className="font-mono border border-gray-700 text-center">
                            {order.id}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            {order.name}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            {order.items.map((item) => (
                                <div key={item.id}>
                                    {item.quantity}x {item.name}
                                </div>
                            ))}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            ৳ {order.total}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            <select
                                value={order.status}
                                onChange={(e) =>
                                    onStatusChange(
                                        order.id,
                                        e.target.value as FetchedOrders["status"]
                                    )
                                }
                                className="p-1 h-full w-4/5 border border-gray-700 rounded"
                            >
                                <option value="pending">Pending</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            {new Date(order.createdAt).toLocaleString()}
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            <Badge variant={order.status}>{order.status}</Badge>
                        </td>
                        <td className="font-mono border border-gray-700 text-center">
                            <Trash2
                                // implement backend delete order
                                onClick={() => {
                                    const confirmed = window.confirm(
                                        "Are you sure you want to delete this orders?"
                                    );
                                    if (confirmed) {
                                        // deleteOrder(order.id);
                                    }
                                }}
                                className="text-2xl"
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
