const express = require('express');
const router = express.Router();
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)

    if (!user)
      return res.status(404).send()

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.status(200).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/logout', async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.status(200).send()
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates' })

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.status(200).send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.status(200).send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;