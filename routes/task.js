const express = require('express');
const router = express.Router();
const TaskModel = require('../model/taskModel');

router.get('/', async (req, res)=>{
    res.send('Hello World');
})

router.get('/task', async (req, res)=>{
    try{
        const task = await TaskModel.find();
        return res.status(201).send(task);

    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

router.post('/task', async(req, res)=>{
    try{
        const task = await TaskModel.create(req.body);
        return res.status(201).send(task);
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

router.patch('/task/:id', async(req, res)=>{
    try{
        const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(201).send(task);
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

router.delete('/task/:id', async(req, res)=>{
    try{
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        return res.status(201).send(task);
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

module.exports = router;