const express = require('express');
const router = express.Router();
const api = require('../services/api');

router.get('/', (req,res) => {
    api.get('/product/mostrar').then( ({data}) => {
        if(data.status == 1) {
            res.render('client/encomendas/confeitaria', {
                layout: 'client/encomenda',
                products: data.products,
            });
        } else {
            res.render('client/encomendas/confeitaria', {
                layout: 'client/encomenda',
            });
        }
    }).catch( (err) => {
        console.log(err);
    })
})

module.exports = router;