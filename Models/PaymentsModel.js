const mongoose= require('mongoose')

const paymentSchema= new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    totalAmountPaid:{
        type:Number,
        required:true
    }
    
})

module.exports= mongoose.model('Payments', paymentSchema)