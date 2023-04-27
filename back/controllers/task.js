const fs = require('fs');
const Task = require('../models/task');

exports.getAllTasks = (req,res,next) => {
    Task.find({userId: req.auth.userId, finished: req.query.finished}).then(
        (tasks) =>{
            res.status(200).json(tasks)
        }
        ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};

exports.getOneTask = (req,res,next) => {
    Task.findOne({userId: req.auth.userId, id:req.params.id}).then(
        (task) =>{
            res.status(200).json(task)
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};

exports.deleteOneTask = (req,res,next) => {
    Task.findOne({id:req.params.id, userId:req.auth.userId})
        .then(task => {
            Task.deleteOne({id:req.params.id, userId:req.auth.userId})
                .then(() => { res.status(200).json({response: 'OK'})})
                .catch(error => res.status(401).json(error));
        }
    )
    .catch( error => {
        res.status(500).json(error);
    });
};

exports.updateOneTask = (req,res,next) => {
    Task.findOne({id:req.params.id, userId:req.auth.userId})
        .then(task => {
                Task.updateOne({id:req.params.id, userId:req.auth.userId},
                    {finished: req.body.finished,name: req.body.name, description:req.body.description} )
                    .then(() => { res.status(200).json({response: 'OK'})})
                    .catch(error => res.status(401).json(error));
            }
        )
        .catch( error => {
            res.status(500).json(error);
        });
};

exports.createTask = (req, res, next) => {
    const taskObject = req.body;
    delete taskObject.id;
    const task = new Task({
        ...taskObject,
    });

    task.save()
        .then(() => { res.status(201).json({response: 'OK'})})
        .catch(error => { res.status(400).json(error)})
};