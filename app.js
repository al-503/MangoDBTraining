// variable d'enviromnement
const express = require('express');
const stuffRoutes = require("./routes/stuff")
const mongoose = require('mongoose');
const environement = require('./environement')

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

// routes //
app.use('/api/stuff', stuffRoutes);

// exports //
module.exports = app;