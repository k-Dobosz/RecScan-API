const mongoose = require('mongoose')

const scanSchema = mongoose.Schema({
    itemId: {
        type: String,
        unique: false,
        required: true
    },
}, { timestamps: true })

const Scan = mongoose.model('Scan', scanSchema)
module.exports = Scan