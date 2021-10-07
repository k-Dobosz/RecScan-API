const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['video', 'image'],
        lowercase: true
    }
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)
module.exports = Article