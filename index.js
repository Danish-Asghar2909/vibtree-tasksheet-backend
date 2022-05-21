const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/task');
const cors = require('cors');

mongoose.connect('mongodb+srv://sibi:6dNntIyy2trrpYnM@cluster0.94k9l.mongodb.net/vibcrm-admin-backend?retryWrites=true&w=majority' , { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongo');
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);


app.listen(4000 , ()=>{
    console.log("server is running on port 8080");
})