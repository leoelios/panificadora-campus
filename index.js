const express = require('express');
const app = express();
const PORT = 3333;

// Middlawares
    app.use(express.json());
    app.use(express.static('public'));

// EXTERNAL MODULES
    // Hadlebars
        const handlebars = require('express-handlebars');
        app.engine('handlebars', handlebars());
        app.set('view engine', 'handlebars');

// Import internal modules
    const mainRt = require('./routes/mainRt');    

// Routes
    app.use('/', mainRt);

app.listen(PORT, () => {
    console.log('servidor aberto na porta: '+PORT);
})


