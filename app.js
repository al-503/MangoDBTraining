// variable d'enviromnement
const express = require('express');
const mongoose = require('mongoose');
const environement = require('./environement');
// routes //
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(environement.DATABASE_TOKEN)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//ça ne devrai pas rester en prod ici
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// routes // le path est celui que j'indique sur mon site c'est moi qui le définit
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// exports //
module.exports = app;