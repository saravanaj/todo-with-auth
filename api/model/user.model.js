const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minlength: 8,
        validate: /^[a-z0-9]+$/i,
        required: [true, 'Username is required']
    },
    passwordhash: {
        type: String,
        required: [true, 'Password is required']
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', userSchema);