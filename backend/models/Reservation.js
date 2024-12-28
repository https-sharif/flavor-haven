import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reservationSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        guests: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Reservation = model("Reservation", reservationSchema);

export default Reservation;
