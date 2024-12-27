import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            unique: true,
            default: function () {
                return this._id.toString();
            }
        },
        items: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                description: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
            },
        ],
        status: {
            type: String,
            enum: ["pending", "preparing", "ready", "delivered", "cancelled"],
            default: "pending",
        },
        total: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        estimatedDeliveryTime: {
            type: Number,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
