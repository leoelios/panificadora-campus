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

router.get('/produtos/cadastro',  (req,res) => {
    res.render('dashboard/produtos/cadastro', {
        layout: 'dashboard/product'
    })
})

const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dpbse0jxf',
    api_key: '355964363781455',
    api_secret: 'tpMylhf94c8xwK1zfOFpd95BqGQ'
});

router.post('/produtos/cadastro', multer(multerConfig).single('img'), async (req,res) => {
    const { name, desc, price } = req.body;
    // Saving the image in cloudinary
        if(!req.file) {
            pathImage = "https://res.cloudinary.com/dpbse0jxf/image/upload/v1582902017/grdfiilp42mhwthwucsq.jpg";
        } else {
            pathImage = req.file.path;
        }
        await cloudinary.uploader.upload(pathImage, async (err,result) => {
            if(err) {
                return console.log(err);
            }
            const { url, original_filename } = result;
            await api.post('/product/cadastrar', {
                name,
                desc,
                price,
                img: {
                    url,
                    originalfile: original_filename,
                }
            }).then( (respApi) => {
                if(respApi.data.status == 0) {
                    res.render('dashboard/produtos/cadastro', {
                        layout: 'dashboard/product',
                    })
                } else {
                    // Resposta da api, renderizar no client
                    res.render('dashboard/produtos/success_cad', {
                        layout: 'dashboard/product',
                    })
                }
            }).catch( (errApi) => {
                console.log('Error on send request to API');
            })
        })
})

router.get('/produtos/visualizar', async (req,res) => {
    await api.get('/product/mostrar', {
        q: req.query.q,
    }).then( (respApi) => {
        res.render('dashboard/produtos/visualizar', {
            layout: 'dashboard/product',
            products: respApi.data.products,
        })
    }).catch( (errApi) => {
        console.log('Error on send a request for get Products to API');
    })
})

module.exports = router;