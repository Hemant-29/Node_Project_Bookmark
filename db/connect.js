const mongoose = require("mongoose")


const connectDB = (connectionString) => {
    mongoose
        .connect(connectionString)
        .then(() => { console.log("Connected to the bookmarks DB...") })
        .catch((err) => { console.log(err) })
}

module.exports = connectDB