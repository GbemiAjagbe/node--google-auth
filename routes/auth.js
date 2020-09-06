const express = require ('express')
const passport = require('passport')
const router = express.Router()


//login with Google
router.get('/auth/google', passport.authenticate('google', {scope: ['profile'] }))

//Google auth callback

router.get(
    '/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/'}), 
    (req, res) => {
    res.redirect('/dashboard')
    }
)

//logout 
router.get('/auth/logout', (req,res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router