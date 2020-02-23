const express = require('express');
const app = express();
const PORT = 3333;

// Middlawares
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(express.static('public'));

// EXTERNAL MODULES
    // Hadlebars
        const handlebars = require('express-handlebars');
        app.engine('handlebars', handlebars());
        app.set('view engine', 'handlebars');

// Import internal modules
    const mainRt = require('./routes/mainRt');    
    const clientRt = require('./routes/clientRt');
    const encomendaRt = require('./routes/encomendaRt');
    const adminRt = require('./routes/adminRt');
    
// Routes
    app.use('/', mainRt);
    app.use('/cliente', clientRt);
    app.use('/encomenda', encomendaRt);
    app.use('/painel', adminRt);

app.listen(PORT, () => {
    console.log('servidor aberto na porta: '+PORT);
})


