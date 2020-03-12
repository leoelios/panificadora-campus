const express = require('express');
const router = express.Router();
const api = require('../services/api');

router.get('/cadastro', (req, res) => {
    res.render('client/cadastro');
})

router.get('/login', (req, res) => {
    res.render('client/login');
})

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/cliente/login');
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
router.get('/painel', (req, res)=>{
    if(req.user.orders.length > 0) {
        const orders = req.user.orders;
        api.get('/order/show', {
            data: {
                id: orders[orders.length - 1],
            }
        }).then( ({data}) => {
            if(data.status == 1) {
                console.log(data.orderTotal.order);
                res.render('client/panel', {
                    order: data.orderTotal.order,
                });
            }
        }).catch( () => {
            console.log('Error on send request to API for find last order');
        })
    } else {
        res.render('client/panel');
    }
})
module.exports = router;