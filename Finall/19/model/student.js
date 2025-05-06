const mongoose = require('mongoose')

const student = mongoose.Schema({
    name:String,
    roll:Number,
    wad:Number,
    dsbda:Number,
    cns:Number,
    cc:Number,
    ai:Number
})

module.exports = mongoose.model('Student',student)