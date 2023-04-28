const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/user');
const path = require('path');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;