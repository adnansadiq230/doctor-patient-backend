const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    
    dob:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    specilist:{
        type:String
    },
   
})

module.exports= mongoose.model('Users', userSchema)