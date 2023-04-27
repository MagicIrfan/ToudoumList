const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const Counter = require('./counter');

const taskSchema = mongoose.Schema({
    id: { type: Number, unique: true},
    userId: { type: Number, required:true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    finished: { type: Boolean, required: true }
});

taskSchema.pre('save', function(next) {
    const doc = this;
    Counter.findByIdAndUpdate({ _id: 'taskId' }, { $inc: { seq: 1 } }, { new: true, upsert: true })
        .then(counter => {
            doc.id = counter.seq;
            next();
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = mongoose.model('Task', taskSchema);