const express = require('express');
const router = express.Router();
const TaskModel = require('../model/taskModel');

router.get('/', async (req, res)=>{
    res.send('Hello World');
})


router.get('/webhook', async (req, res)=>{
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if(mode && token){
        if(mode === 'subscribe' && token === 'Vibtree@123'){
            res.status(200).send(challenge);
        }else{
            res.sendStatus(403);
        }
    }
})

router.post('/webhook', async (req, res)=>{
    const data = req.body;
    console.log("body : ",data);
    // console.log("entry : ", data.entry);
    

    // data.entry.map((entry)=>{
    //     console.log("data.entry : ", entry);
    //     console.log("data.entry.changes : ", entry.changes);
    // })

    console.log("object : ", JSON.stringify(data));

    if(data.object === 'page'){
        data.entry.forEach(async (pageEntry)=>{
            pageEntry.messaging.forEach(async (messagingEvent)=>{
                if(messagingEvent.message){
                    receiveMessage(messagingEvent);
                }
            })
        })
        res.sendStatus(200);
    }
    return res.status(200).json(data);
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