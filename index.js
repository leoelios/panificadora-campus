const express = require('express');
const app = express();
const PORT = 3333;
const passport = require('passport');
require('./config/auth')(passport);
const session = require('express-session');
const flash = require('connect-flash');
const verifyLogIn = require('./helpers/isAdmin');

// Session
    app.use(session({
        secret: '102030',
        resave: true,
        saveUninitialized: true,
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

// Mongoose
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://leodev:102030@brasildb-ze1rv.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then( () => {
        console.log("DB Connected");
    }).catch( (err) => {
        console.log(err);
    })

// Middlawares
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(express.static('public'));
    app.use( (req, res, next) => {
        res.locals.error = req.flash('error');
        res.locals.success = req.flash('success');
        if(req.user) {
            const LogClient = {
                name: req.user.name,
                surname: req.user.surname,
            }
            res.locals.client = LogClient;
        }
        next();
    })

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
    app.use('/painel', verifyLogIn, adminRt);

app.listen(PORT, () => {
    console.log('servidor aberto na porta: '+PORT);
})


