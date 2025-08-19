import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Route to create an order
router.post("/create-order", async (req, res) => {
    const { userId, name, items, total, status, estimatedDeliveryTime } = req.body;
    
    try {
        const newOrder = new Order({
            userId,
            name,
            items,
            total,
            status: status || "pending",
            createdAt: new Date(),
            estimatedDeliveryTime,
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",
            order: newOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update an order
router.put("/update-order/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (status) order.status = status;

        await order.save();

        res.status(200).json({
            message: "Order updated successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete an order
router.delete("/delete-order/:orderId", async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order deleted successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to fetch all orders for a user
router.get("/fetch-user-orders/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json({
            message: "Orders retrieved successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/fetch-all-orders", fetchAllOrdersLimiter, async (req, res) => {
    try {
        const orders = await Order.find();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json({
            message: "Orders retrieved successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
