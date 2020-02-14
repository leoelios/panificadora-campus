const express = require('express');
const router = express.Router();

router.get('/cadastro', (req,res) => {
    res.render('client/cadastro');
})

module.exports = router;