const express = require('express');
const router = express.Router();
const api = require('../services/api');

router.get('/cadastro', (req, res) => {
    res.render('client/cadastro');
})

router.get('/login', (req, res) => {
    res.render('client/login');
})

router.post('/cadastro', async (req, res) => {
    const {
        name,
        surname,
        birthday,
        cel,
        email,
        password,
        city,
        state,
        cep,
        address
    } = req.body;

    api.post('/cliente/cadastro', {
        name,
        surname,
        birthday,
        cel,
        email,
        password,
        city,
        state,
        cep,
        address
    }).then((reqr) => {
        console.log(reqr.data);
        res.render('client/cadastro', { erros: reqr.data.erros});
    }).catch((errreq) => {
        res.send(errreq);
    })

})
module.exports = router;