const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date, required: true },
    userId: { type: String, required: false },
    courseId: { type: String, required: false },
    url: { type: String, required: true },
});



module.exports = mongoose.model('Meeting', meetingSchema);