const express = require('express')
const router = express.Router()
const Article = require('../models/article')

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().exec()

        res.status(200).send(articles)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
