const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080', // Updated to match client's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes );
app.use("/api/orders", orderRoutes);
app.use('/api/users',userRoutes );
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// Test route
app.get('/', (req, res) => {
  res.send('Auth API is running...');
});

// app.use(errorHandler);

const PORT = process.env.PORT || 8080; // Updated to match client's port

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});