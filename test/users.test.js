const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const app = require('../src/app')
const User = require('../src/models/user')

const userId = new mongoose.Types.ObjectId()

const user = {
    _id: userId,
    email: 'johnny@example.com',
    password: 'Password123',
    tokens: [{
        token: jwt.sign({ _id: userId }, process.env.JWT_TOKEN_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(user).save()
})

test('Should create a new user', async () => {
    await request(app).post('/api/v1/users/').send({
        email: "example@example.com",
        password: "Password1234"
    }).expect(201)
})

test('Shouldnt create a new user because of too short password', async () => {
    await request(app).post('/api/v1/users/').send({
        email: "example@example.com",
        password: "123"
    }).expect(400)
})

test('Shouldnt create a new user because user with this email already exists', async () => {
    await request(app).post('/api/v1/users/').send({
        email: user.email,
        password: user.password
    }).expect(400)
})

afterAll(done => {
    mongoose.connection.close()
    done()
})