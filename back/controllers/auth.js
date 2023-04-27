const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((oldUser) => {
            if (oldUser) {
                // un utilisateur inscrit avec le même email existe
                // -> on retourne une réponse sans aller plus loin
                return res.status(409).json({ response: 'Email déjà existant !' });
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = new User({
                            email: req.body.email,
                            username: req.body.username,
                            password: hash
                        });
                        user.save()
                            .then(() => res.status(201).json({response: 'OK'}))
                            .catch(error => {
                                res.status(400).json({ response: 'Utilisateur déjà existant !' });
                            });
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            }
        })
        .catch((error) => res.status(500).json(error));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ response: 'Email ou mot de passe incorrect !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ response: 'Email ou mot de passe incorrect !' });
                    }
                    const userId = `${user.id}`;
                    const token = jwt.sign(
                        { userId: userId },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '1h' }
                    );
                    res.status(200).json({
                        userId: userId,
                        token: token
                    });
                })
                .catch(error => {
                    res.status(500).json({ response: 'Erreur serveur !' });
                });
        })
        .catch(error => {
            res.status(500).json({ response: 'Erreur serveur !' });
        });
};

