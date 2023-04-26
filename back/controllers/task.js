const fs = require('fs');
const Task = require('../models/task');

exports.getAllTasks = (req,res,next) => {
    Task.find({userId: req.auth.userId}).then(
        (tasks) =>{
            res.status(200).json(tasks)
        }
        ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneTask = (req,res,next) => {
    Task.find({userId: req.auth.userId, id:req.params.id}).then(
        (task) =>{
            res.status(200).json(task)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteOneTask = (req,res,next) => {
    Task.findOne({id:req.params.id, userId:req.auth.userId})
        .then(task => {
            Task.deleteOne({id:req.params.id, userId:req.auth.userId})
                .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                .catch(error => res.status(401).json({ error }));
        }
    )
    .catch( error => {
        res.status(500).json({ error });
    });
};

exports.updateOneTask = (req,res,next) => {
    Task.findOne({id:req.params.id, userId:req.auth.userId})
        .then(task => {
                Task.updateOne({id:req.params.id, userId:req.auth.userId})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            }
        )
        .catch( error => {
            res.status(500).json({ error });
        });
};

exports.createTask = (req, res, next) => {
    const taskObject = JSON.parse(req.body.task);
    const task = new Task({
        ...taskObject,
    });

    task.save()
        .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
        .catch(error => { res.status(400).json( { error })})
};