import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Route to create a contact
router.post("/", async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            subject,
            message,
            createdAt: new Date(),
        });

        await newContact.save();

        res.status(201).json({
            message: "Contact created successfully",
            contact: newContact,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
