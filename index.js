const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/task');
const cors = require('cors');

const DB_URL = 'mongodb+srv://sibi:6dNntIyy2trrpYnM@cluster0.94k9l.mongodb.net/vibcrm-admin-backend?retryWrites=true&w=majority';

mongoose.connect(DB_URL , { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongo');
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT , ()=>{
    console.log("server is running on port " + PORT);
})