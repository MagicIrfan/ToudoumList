const mongoose = require('mongoose');
const { Schema } = mongoose;
const Counter = require('./counter');

const userSchema = new Schema({
    id: { type: Number,unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
userSchema.pre('save', function(next) {
    const doc = this;
    Counter.findByIdAndUpdate({ _id: 'userId' }, { $inc: { seq: 1 } }, { new: true, upsert: true })
        .then(counter => {
            doc.id = counter.seq;
            next();
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = mongoose.model('User', userSchema);