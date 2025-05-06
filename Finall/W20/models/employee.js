const mongoose = require('mongoose')

const employee = mongoose.Schema({
    name:String,
    department:String,
    designation:String,
    salary:Number,
    doj:Date,
})

module.exports = mongoose.model('Employee',employee)