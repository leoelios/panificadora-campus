const express = require('express');
const router = express.Router();

router.get('/cadastro', (req,res) => {
    res.render('client/cadastro');
})

router.get('/login', (req,res) => {
    res.render('client/login');
})

module.exports = router;