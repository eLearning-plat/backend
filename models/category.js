const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
    title: { type: String, required: true, unique: true  },
    description: { type: String, required: true },
});


categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);