import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/get-user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const
        user = await User.findOne({ userId });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User found",
            user,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/create-user", async (req, res) => {
    const { userId, email, name, photoURL } = req.body;

    try {
        const newUser = new User({
            userId : userId,
            name : name,
            email : email,
            address: "",
            phone: "",
            photoUrl: photoURL,
            role: "customer",
        });

        console.log(newUser);
        await newUser.save();

        res.status(201).json({
            message: "New user created",
            user: newUser,
        });
    } catch (error) {
        console.error("Error checking or creating user:", error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/update-user", async (req, res) => {
    const { userId, name, address, phone } = req.body;

    try {
        const existing = await User.findOne({ userId });

        if (!existing) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) existing.name = name;
        if (address) existing.address = address;
        if (phone) existing.phone = phone;

        await existing.save();

        res.status(200).json({
            message: "User updated",
            user: existing,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get("/get-all-users", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "All users",
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
