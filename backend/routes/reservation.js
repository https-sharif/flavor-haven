import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

router.post('/create-reservation', async (req, res) => {
    const { userId, date, time, guests, name, table, status } = req.body;

    try {
        const newReservation = new Reservation({
            userId,
            date,
            time,
            guests,
            name,
            table,
            status: status || 'pending',
        });

        await newReservation.save();

        res.status(201).json({
            message: 'New reservation created',
            reservation: newReservation,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/fetch-all-reservation', async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        
        res.status(200).json({
            message: 'All reservations fetched successfully',
            reservations,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete-reservation/:reservationId', async (req, res) => {
    const { reservationId } = req.params;

    try {
        const result = await Reservation.findByIdAndDelete(reservationId);

        if (!result) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.status(200).json({
            message: 'Reservation deleted successfully',
            reservation: result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update-reservation/:reservationId', async (req, res) => {
    const { reservationId } = req.params;
    const { status } = req.body;

    try {
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (status) reservation.status = status;

        await reservation.save();

        res.status(200).json({
            message: 'Reservation updated successfully',
            reservation: reservation,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
