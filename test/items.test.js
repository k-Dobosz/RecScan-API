const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const app = require('../src/app')
const Item = require('../src/models/item')
const User = require('../src/models/user')

const userId = new mongoose.Types.ObjectId()

const user = {
    _id: userId,
    email: 'jerry@example.com',
    password: 'Password123',
    tokens: [{
        token: jwt.sign({ _id: userId }, process.env.JWT_TOKEN_SECRET)
    }]
}

const item = {
    barcode: 5902768521009,
    type: 'plastic'
}

beforeEach(async () => {
    await Item.deleteMany()
    await User.deleteMany()
    await new User(user).save()
    await new Item(item).save()
})

test('Should get item type by barcode', async () => {
    await request(app).get('/api/v1/items/5902768521009')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Shouldnt get item because of wrong barcode', async () => {
    await request(app).get('/api/v1/items/123')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send()
    .expect(400)
})

test('Shouldnt get item because of wrong barcode', async () => {
    await request(app).get('/api/v1/items/5921457212471')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send()
    .expect(404)
})

afterAll(done => {
    mongoose.connection.close()
    done()
})