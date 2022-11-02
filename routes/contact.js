const Contact = require('../models/contact')
const express = require('express')

const router = express()


// Create new Contact
router.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Content cannot be empty')
        return
    }
    try {
        const user = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })

        const createdUser = await user.save()
        res.status(201).redirect('/contactList')
    } catch (error) {
        res.status(500).send(error)
    }

})
// get all users
router.get('/', async (req, res) => {
    try {
        if (req.query.id) {
            const users = await Contact.find({ _id: req.query.id })
            res.status(200).send(users)
        } else {
            const users = await Contact.find().sort({ name: 1 })
            res.status(200).send(users)
        }


    } catch (error) {
        res.status(500).send(error)
    }
})
// update user
router.put('/:id', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Content cannot be empty')
        return
    }

    const id = req.params.id
    try {
        const update = await Contact.findByIdAndUpdate(id, req.body)
        res.send(update)
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete User
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deletedUser = await Contact.deleteOne({ _id: id })
        res.send(deletedUser)
    } catch (error) {
        res.status(400).send(error)

    }
})

module.exports = router