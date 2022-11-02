const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number
})

const contactModel = new mongoose.model('contact', contactSchema)

module.exports = contactModel