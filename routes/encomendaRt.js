const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('client/encomendas/confeitaria', {
        layout: 'client/encomenda',
        nameCategory: 'Confeitaria - Doces',
    });
})

module.exports = router;