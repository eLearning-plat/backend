const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({   
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    state: { type: Boolean, default: false },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Blog', blogSchema);