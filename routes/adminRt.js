const express = require('express');
const router = express.Router();
const api = require('../services/api');

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
// Implementar middlaware passport authentication

router.get('/', (req,res) => {
    res.render('dashboard/index', {
        layout: 'dashboard'
    })
})

router.get('/clientes', (req, res) => {
    const { q } = req.query;
    api.get('/cliente/encontrar', {
        data: {
            email: q
        }
    }).then((result) => {
        res.render('dashboard/clientes', {
            layout: 'dashboard',
            clients: result.data.clients,
        });
    }).catch((err) => {
        console.log('Error on send requisition for API');
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


router.get('/produtos', (req,res) => {
    res.render('dashboard/produtos/index', {
        layout: 'dashboard/product'
    })
})

router.get('/produtos/cadastro', (req,res) => {
    res.render('dashboard/produtos/cadastro', {
        layout: 'dashboard/product'
    })
})

router.get('/produtos/visualizar', (req,res) => {
    res.render('dashboard/produtos/visualizar', {
        layout: 'dashboard/product',
    })
})

module.exports = router;