const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    // 10 correspond aux nombre de boucle de l'aglgo bcrypt(algo non réversible)
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            })
            // une fois le user créer ont doit toujours save
            user.save()
                .then(() => res.status(200).json({ message: "sauvegarde réussie !" }))
                .catch(() => res.status(400).json({ message: "erreur lors de la sauvegarde !" }))
        })
        .catch((error) => res.status(500).json({ message: `erreur lors de l'enregistrement !, ${error}` }));
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            // ont gere le cas ou ont a pas d'user sans dire si le user existe ou pas pour ne pas faire une fuite de donnée
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' }); // 401 unauthorized
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        // ont gere le cas ou ont a pas d'user sans dire si le user existe ou pas pour ne pas faire une fuite de donnée
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' }); // 401 unauthorized
                    }

                    return res.status(200).json({
                        // _id defini par mango db
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            // clé secrete encodage en prod il faudrait une longue chaine et caché dans le .env
                            "BANANA_KEY",
                            // durée de connexion
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch(err => res.status(500).json({ err }))
        })
        .catch(error => res.status(500).json({ error }))
};
