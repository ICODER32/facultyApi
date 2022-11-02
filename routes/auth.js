const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email })
        if (userFound.password === password) {
            res.cookie('signed', 'signedIn')
            res.redirect('/contactList')
        } else {
            res.status(400).json({ message: 'User Not Found' })
        }
    } catch (error) {
        res.status(400).json({ message: 'User Not Found' })
    }
})

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = new User({
            username, email, password
        })
        const createdUser = await user.save()
        res.status(201).json(createdUser)
    } catch (error) {
        res.status(500).json(error)

    }
})
module.exports = router