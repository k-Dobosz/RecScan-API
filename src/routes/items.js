const express = require('express')
const auth = require('../middleware/auth')
const Item = require('../models/item')
const User = require('../models/user')
const router = express.Router()

router.get('/:barcode', auth, async (req, res) => {
    const barcode = req.params.barcode

    if (barcode.length !== 13)
        return res.status(400).send({
            error: 'Barcode length have to be equal to 13'
        })

    try {
        const item = await Item.findOne({ barcode })

        if (!item)
            return res.status(404).send({
                error: 'Item with this barcode not found'
            })

        req.user.scans.concat({
            itemId: item._id
        })

        req.user.save()

        // const result = await User.find({ _id: req.user._id }).exec()

        // let gainedPoints = false

        // if (result[0].points.length < 5) {
        //     result[0].points = result[0].points + 1
        //     result[0].save()
        //     gainedPoints = true
        // }

        res.status(200).send({
            barcode: item.barcode,
            type: item.type,
            gainedPoints
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router