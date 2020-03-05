const express = require('express');
const router = express.Router();
const api = require('../services/api');
const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dpbse0jxf',
    api_key: '355964363781455',
    api_secret: 'tpMylhf94c8xwK1zfOFpd95BqGQ'
});

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


router.get('/encomendas', async (req,res) => {
    // Receber parametro via route params e realizar o filtro dos pedidos
    // de acordo com o parametro passado!
    await api.get('/order/index').then( (respApi) => {
        const { status } = respApi.data;
        if(status == 1) {
            res.render('dashboard/encomendas', {
                layout: 'dashboard',
                orders: respApi.data.orders,
            })
        } else {
            res.render('dashboard/encomendas', {
                layout: 'dashboard',
            })
        }
    }).catch( () => {
        res.send('Error on request orders');
    })
})


router.get('/encomenda/:id', async (req,res) => {
    // Implementar algoritmo para receber o ID do pedido e
    // buscar na db o pedido e inserir os dados para dentro do handlebars
    await api.get('/order/show', {
        data: {
            id: req.params.id,
        }
    }).then( (respApi) => {
        const { status } = respApi.data;
        if(status == 1) {
            const { orderTotal } = respApi.data;
            res.render('dashboard/visualizarEncomenda', {
                layout: 'dashboard',
                client: orderTotal.client,
                order: orderTotal.order,
            })
        } else {
            res.redirect('/painel');
            req.flash('error', respApi.data.error);
        }
    }).catch( (errApi) => {
        console.log(errApi);
        res.send('Error on load Order in API: \n'+errApi);
    })
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

router.post('/produtos/cadastro', multer(multerConfig).single('img'), async (req,res) => {
    const { name, desc, price } = req.body;
    // Saving the image in cloudinary
        if(!req.file) {
            pathImage = "https://res.cloudinary.com/dpbse0jxf/image/upload/v1582990973/inla7fxtrhqecgyqtn8r.png";
        } else {
            pathImage = req.file.path;
        }
        await cloudinary.uploader.upload(pathImage, async (err,result) => {
            if(err) {
                return console.log(err);
            }
            const { url, original_filename, public_id } = result;
            await api.post('/product/cadastrar', {
                name,
                desc,
                price,
                img: {
                    url,
                    originalfile: original_filename,
                    public_id
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

router.get('/produto/info/:id', async(req,res) => {
    const id = req.params.id;
    await api.get('/product/encontrar/', {
        data: {
            id,
        }
    }).then( (respApi) => {
        res.render('dashboard/produtos/info_prod', {
            layout: 'dashboard/product',
            product: respApi.data.product
        })
    }).catch( (errApi) => {
        console.log('Error on send request to API for get Information individually of a Product');
    })
})

router.get('/produto/info/:id/delete', async (req,res) => {
    const { id } = req.params;
    await api.delete('/product/deletar', {
        data: {
            id
        }
    }).then( async (respApi) => {
        if(respApi.data.status == 1) {
            res.redirect('/painel/produtos/visualizar');
            const public_id_delete = respApi.data.deleteProduct.imgPublic_id;
            await cloudinary.uploader.destroy(public_id_delete, (error, result) => {
                if(error) {
                    return console.log('Error on delete image in Cloud\n'+error);
                }
            })
        }
    }).catch( (errApi) => {
        console.log('Error on send request to API for remove an individually of a Product\n'+errApi);
    })
}) 

router.get('/produto/info/:id/update', async (req,res) => {
    const { id } = req.params;
    // Get information of product by ID
        await api.get('/product/encontrar', {
            data: {
                id: id,
            }
        }).then( (respApi) => {
            const product = respApi.data.product;
            res.render('dashboard/produtos/edit_prod', {
                layout: 'dashboard/product',
                product
            });
        }).catch( (errApi) => {
            console.log('Error on send request to API for find the product by id\n'+errApi);
        })
})

router.post('/produto/info/atualizar', async (req,res) => {
    const { id, price, desc, name } = req.body;
    await api.put('/product/editar', {
        id,
        product: {
            name,
            desc,
            price
        }
    }).then( (respApi) => {
        if(respApi.data.status == 1) {
            req.flash('success', 'Produto editado com sucesso!');
        } else {
            req.flash('success', 'Não foi possivel alterar o produto');
        }
        res.redirect('/painel/produtos/visualizar');
    }).catch( (errApi) => {
        console.log('Error on send request to API for update product\n'+errApi);
    })
})

module.exports = router;