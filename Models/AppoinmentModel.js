const mongoose= require('mongoose')

const appoinmentSchema= new mongoose.Schema({

    doctor:{
        type:mongoose.Schema.ObjectId,
        ref :"Users",
        required:true
    },
    patient:{
        type:mongoose.Schema.ObjectId,
        ref :"Users",
        required:true
    },
    disease:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Processing"
    },
    treatment:{
        type:String
    },
    date:{
        type:String,
        required:true
    }
    
})

module.exports= mongoose.model('Appointment', appoinmentSchema)