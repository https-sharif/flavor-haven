import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String },
        photoUrl: { type: String },
        phone: { type: String },
        role: { type: String, enum: ["customer", "admin"], default: "customer" },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
