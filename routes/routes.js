const express = require('express')

const router = express.Router();
const axios = require('axios')

const auth = (req, res, next) => {
    if (!req.cookies.signed) {
        res.redirect('/login')
    }
    next()
}

router.get('/', (req, res, next) => {
    res.render('index')
})
router.get('/about', (req, res, next) => {
    res.render('aboutme')
})
router.get('/contact', (req, res, next) => {
    res.render('contact')
})
router.get('/projects', (req, res, next) => {
    res.render('projects')
})
router.get('/services', (req, res, next) => {
    res.render('services')
})

router.get('/login', (req, res, next) => {
    res.render('signIn')
})
router.get('/contactList', auth, async (req, res, next) => {
    try {
        const users = await axios.get('https://compassign229.herokuapp.com/api/contact')
        res.status(200).render('contactList', { data: users.data })
    } catch (error) {
        res.status(500).send({ message: "Database Not ACCESSIBLE" })
    }
})
router.get('/add', auth, (req, res, next) => {
    res.render('addUser')
})
router.get('/update', auth, async (req, res, next) => {
    const selectedUser = await axios.get('https://compassign229.herokuapp.com/api/contact', { params: { id: req.query.id } })
    res.render('updateUser', { data: selectedUser.data })
})
router.get('/logout', (req, res) => {
    res.clearCookie('signed');
    res.redirect('/login')
})

module.exports = router