const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/' , (req,res) => {
    res.render('home/home', {layout: 'home'});
})

router.get('/about', (req,res)=>{
    res.render('home/sobre')
})

router.post('/login' , (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/encomenda',
        failureRedirect: "/cliente/login",
        failureFlash: true,
    })(req, res, next);
})

module.exports = router;