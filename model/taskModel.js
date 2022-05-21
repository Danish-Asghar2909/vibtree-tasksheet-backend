const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

  Id:{
    type: String,
    required : false
  },
Title:{
    type: String,
    required : false
},
Status:{
    type: String,
    required : false
},
Summary:{
    type: String,
    required : false

},
Type:{
    type: String,
    required : false

},
Priority:{
    type: String,
    required : false
},
Tags:{
    type: String,
    required : false
},
Estimate:{
    type: Number,
    required : false
},
Assignee:{
    type: String,
    required : false
},
RankId : {
    type: Number,
    required : false
},
Color:{
    type: String,
    required : false
},
ClassName : {
    type: String,
    required : true,
    default : 'e-story, e-low, e-nancy-davloio'
},
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('task', taskSchema)