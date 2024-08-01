const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    file :{ type: String, required: true },
    userID : { type: String, required: true },
    categoryID : { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: Boolean, default: false }, 
    courseID: { type: String }
});


module.exports = mongoose.model('Document', documentSchema);