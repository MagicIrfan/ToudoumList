const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const taskSchema = mongoose.Schema({
    id: { type: Number, required:true,unique: true},
    userId: { type: Number, required:true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    finished: { type: Boolean, required: true }
});

module.exports = mongoose.model('Task', taskSchema);