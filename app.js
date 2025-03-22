// variable d'enviromnement
const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require("./routes/stuff")
//vide pour l'instant
const app = express();

//ça ne devrai pas rester en prod ici
mongoose.connect('mongodb+srv://axelridray:5n5wHlu1HbKQuWcm@clustertestcourmango.dgso4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTestCourMango')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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