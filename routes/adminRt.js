const express = require('express');
const router = express.Router();
const api = require('../services/api');

// Implementar middlaware passport authentication

router.get('/', (req,res) => {
    res.render('dashboard/index', {
        layout: 'dashboard'
    })
})

router.get('/clientes', (req,res) => {
    res.render('dashboard/clientes', {
        layout: 'dashboard'
    })
})


router.get('/encomendas', (req,res) => {
    // Receber parametro via route params e realizar o filtro dos pedidos
    // de acordo com o parametro passado!
    res.render('dashboard/encomendas', {
        layout: 'dashboard'
    })
})


router.get('/encomenda/:id', (req,res) => {
    // Implementar algoritmo para receber o ID do pedido e
    // buscar na db o pedido e inserir os dados para dentro do handlebars
    res.render('dashboard/visualizarEncomenda', {
        layout: 'dashboard'
    })
    console.log(req.params);
})

module.exports = router;