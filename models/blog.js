const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({   
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    state: { type: Boolean, default: false },
    date: { type: Date, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Blog', blogSchema);