const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getUser = (req, res, next) => {
    User.findOne({ email: req.query.email})
        .then(
            (user) =>{
                if(!user){
                    return res.status(401).json({ response: 'Email ou mot de passe incorrect !' });
                }
                res.status(200).json(user);
            }
        ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        });
};