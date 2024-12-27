import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import trackRoutes from './routes/track.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to Database
mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Flavor Haven API!');
});

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/track', trackRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
