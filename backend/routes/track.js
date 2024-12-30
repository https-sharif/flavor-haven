import express from "express";
import Order from "../models/Order.js";
import Reservation from "../models/Reservation.js";

const router = express.Router();

router.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findOne({ id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order found", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/reservation/:reservationId", async (req, res) => {
    const { reservationId } = req.params;
  
    try {
      const reservation = await Reservation.findOne({ id: reservationId });
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.status(200).json({ message: "Reservation found", reservation });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;
