const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        lowercase: true
    },
    barcode: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['plastic', 'paper', 'glass', 'bio', 'other'],
        lowercase: true
    }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item