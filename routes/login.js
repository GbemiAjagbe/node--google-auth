const express = require ('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/dashboard', ensureAuth, (req,res) => {
    //console.log(req.user)    
    const name = req.user.firstName
    res.send(`Welcome ${name}`)
    })

router.get('/', ensureGuest, (req,res) => {
    res.send ('Logout or Failed login')
})


module.exports = router