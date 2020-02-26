const express = require('express');
const router = express.Router();

router.get('/' , (req,res) => {
    res.render('home/home', {layout: 'home'});
})

router.get('/about', (req,res)=>{
    res.render('home/sobre')
})

module.exports = router;