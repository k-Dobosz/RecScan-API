const express = require('express')
const Item = require('../models/item')
const Scan = require('../models/scan')
const router = express.Router()

router.get('/:barcode', async (req, res) => {
    const barcode = req.params.barcode

    try {
        const item = await Item.findOne({ barcode })

        if (!item)
            return res.status(404).send({
                error: 'Item with this barcode not found'
            })

        const scan = new Scan({
            itemId: item._id
        })

        await scan.save()

        res.status(200).send({
            barcode: item.barcode,
            type: item.type
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
