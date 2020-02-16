const express = require('express');
const router = express.Router();

router.get('/cadastro', (req,res) => {
    res.render('client/cadastro');
})

router.get('/login', (req,res) => {
    res.render('client/login');
})

router.get('/encomenda', (req,res) => {
    res.render('client/encomenda');
})

module.exports = router;