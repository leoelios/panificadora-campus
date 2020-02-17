const express = require('express');
const router = express.Router();

// Implementar middlaware passport authentication

router.get('/', (req,res) => {
    res.render('dashboard/index', {
        layout: 'dashboard'
    })
})

module.exports = router;