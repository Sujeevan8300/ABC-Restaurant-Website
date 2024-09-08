const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require("./routes/userRoutes");
require('dotenv').config(); // For environment variables

// Middleware setup
app.use(express.json()); // Built-in JSON parser, bodyParser.json() is redundant
app.use(cookieParser()); // Cookie parser
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // React app origin
    credentials: true // Allow credentials (cookies)
}));

// Routes
app.use("/user", userRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to ABC Restaurant API!');
});

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
