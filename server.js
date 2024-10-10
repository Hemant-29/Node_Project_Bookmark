const connectDB = require('./db/connect');
require('dotenv').config()
const express = require('express');
const app = express();
const port = 5000;


// Import Statics
app.use(express.static('./public'))


// Middlewares
app.use(express.json())

// Custom routers Middleware
const bookmarkRouter = require("./routes/api_bmarks");
app.use('/api/v1/bmarks', bookmarkRouter);

// Routes


// Start function to connect to the DB and then start listening to server
const start = async () => {
    try {
        await connectDB(process.env.Mongo_URI)
        // App Listen
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Link: http://localhost:${port}`)
        });
    } catch (error) {
        console.log(error);
    }
}

start();