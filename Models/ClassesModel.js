const mongoose= require('mongoose')

const classesSchema= new mongoose.Schema({

    imageName:{
        type:String,
        required:true
    },
    className:{
        type:String,
        required:true
    },
    length:{
        type:String,
        required:true
    }
})
module.exports= mongoose.model('Classes', classesSchema)