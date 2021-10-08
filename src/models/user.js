const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    points: {
        type: Number,
        default: 0
    },
    scans: [{
        itemId: {
            type: mongoose.Types.ObjectId,
            unique: false,
            required: true
        },
    }]
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.__v

    return userObject
}

const User = mongoose.model('User', userSchema)
module.exports = User