const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const userId = req.header('Authorization')
        const user = await User.findOne({ _id: userId })

        if (!user)
            throw new Error()

        req.user = user
        next()
    } catch (e) {
        res.status(401).send()
    }
}

module.exports = auth