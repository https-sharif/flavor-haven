import express from "express";
import Order from "../models/Order.js";
// import Reservation from "../models/Reservation.js";

const router = express.Router();

// Fetch order by orderId
router.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
    console.log("orderId", orderId);
  try {
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order found", order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/reservation/:reservationId", async (req, res) => {
    const { reservationId } = req.params;
  
    try {
      const reservation = await Reservation.findOne({ reservationId });
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.status(200).json({ message: "Reservation found", reservation });
    } catch (error) {
      console.error("Error fetching reservation:", error);
      res.status(500).json({ message: error.message });
    }
  });

export default router;
