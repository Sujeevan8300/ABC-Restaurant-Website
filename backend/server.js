const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/userRoutes");
const menuCategoryRoutes = require("./routes/menuCategoryRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const specialOfferRoutes = require("./routes/specialOfferRoutes");

require('dotenv').config();

// Middleware setup
app.use(express.json({ limit: '10mb' })); // Increase limit to handle large image uploads
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded data
app.use(cookieParser()); // Cookie parser
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // React app origin
    credentials: true // Allow credentials (cookies)
}));

// Routes
app.use("/user", userRoutes);
app.use("/menu-categories", menuCategoryRoutes);
app.use("/menu-items", menuItemRoutes);
app.use("/services", serviceRoutes);
app.use("/special-offers", specialOfferRoutes);


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
