const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name is required"],
        trim: true,
        maxlength: 25,
    },
    link: {
        type: String,
        required: [true, "A link is required"],
    }
})

module.exports = mongoose.model('bookmark', bookmarkSchema)