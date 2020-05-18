const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialUsers = [
    {
        name: 'Aleksi Roitto',
        passwordHash: '$2a$10$rFwm87DiBkeoxFlkW.oKceFGxXNd4b241dWdRHTIvro9ztz5WJbR2',
        username: 'AleksiR',
    },
    {
        name: 'Testi testinen',
        passwordHash: '$2a$10$aijjVmZDtO.mcTV2B4arr.6BCzQMSK6qSGwuOfgv50PUM0WryaiJq',
        username: 'Testi1',
    }
]

const singleUserInDb = async () => {
    return await User.findOne({ username: 'antti' })
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getToken = async () => {
    const user = await singleUserInDb()
    return jwt.sign(
        {
            username: user.username,
            id: user.id
        },
        process.env.SECRET)
}

const notExistingId = async () => {
    const user = new User(
        {
            name: 'Testi Testinen',
            password: 'Testissa',
            username: 'Testinen1'
        }
    )
    await user.save()
    await user.remove()

    return user._id.toString()
}

module.exports = {
    initialUsers, usersInDb, singleUserInDb, notExistingId, getToken
}