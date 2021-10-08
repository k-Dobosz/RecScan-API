const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post('/', async (req, res) => {
  const name = req.body.name

  console.log(req.body)
  const user = new User({ name })

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.get('/ranking', async (req, res) => {
  try {
    const ranking = await User.find({}).sort({ points: -1 }).limit(15).exec()

    res.status(200).send(ranking)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/logout', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id)

    res.status(200).send()
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;