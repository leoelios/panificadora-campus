const express = require('express');
const router = express.Router();

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
module.exports = router;