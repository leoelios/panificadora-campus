const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/' , (req,res) => {
    res.render('home/home', {layout: 'home'});
})

router.get('/about', (req,res)=>{
    res.render('home/sobre')
})

router.get('/404error', (req,res)=>{
    res.render('home/404', {
        layout: "clear"
    })
})

router.post('/login' , (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/encomenda',
        failureRedirect: "/cliente/login",
        failureFlash: true,
    })(req, res, next);
})

//>>>>>>> f5437aa11de5b5e1043dcbfedfb5f2c189a8fb6f
module.exports = router;