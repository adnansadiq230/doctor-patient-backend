
var express = require('express');
const { request } = require('http');
const mongoose= require('mongoose')
const User=require('./Models/UserModel')
const Classes=require('./Models/ClassesModel')
const Payment=require('./Models/PaymentsModel')
const Appointment=require('./Models/AppoinmentModel')
const cors=require('cors')
var bodyParser = require('body-parser')
var app = express();
const path = require('path');
app.use(cors({origin: '*'}))
app.use(express.json());
const hbs = require('hbs')
app.set('view engine', 'hbs')
const connectToDatabase=()=>{

    var conString ="mongodb+srv://adnanSadiq:fa19bse036@mattress.p2zymyx.mongodb.net/dpportal"
    mongoose.connect(conString,{ useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{
        console.log(`mongo db is connected with server ${data.connection.host}`)
    
    }).catch((error)=>{
        console.log("mongo db is not connected with server")
    })
}

connectToDatabase()
app.get('/', function (req, res) {
//   res.status(200).send('Welcome to GYM');
  res.json({message:'frontend/indexhtml'});
});

app.post('/register',async function (req, res) {
    try{
        const isAlreadyExist=await User.findOne({email:req.body.email})
        if(isAlreadyExist){
            res.status(400).json({
                success:false,
                message:"User with this email already exist"
            })
        }
        else{
            const user=await User.create(req.body)            
            res.status(200).json({
                success:true,
                message:"user register Successfuly",
                user
            })
        }
    }
    catch{
        res.status(200).json({
            success:false,
            message:"user not register"
        })
    }
  });

  app.post('/login',async function (req, res) {
    try{
        console.log(req.body);
        const user=await User.findOne({email:req.body.email,password:req.body.password})
        if(user){
            res.status(200).json({
                success:true,
                message:"user logged Successfuly",
                user
            })
        }
        else{
            res.status(401).json({
                success:false,
                message:"inavlid user name or password"
            })
        }
    }
    catch{
        res.status(400).json({
            success:false,
            message:"user not logged"
        })
    }
  });

  app.get('/doctors',async function (req, res) {
    try{
        const doctors=await User.find({role:'doctor'})  
        res.status(200).json({
            success:true,
            message:"get all doctors Successfuly",
            doctors
        })
    }
    catch{
        res.status(400).json({
            success:false,
            message:"error accur"
        })
    }
  });
  app.get('/patients',async function (req, res) {
    try{
        const patients=await User.find({role:'patient'})  
        res.status(200).json({
            success:true,
            message:"get all patients Successfuly",
            patients
        })
    }
    catch{
        res.status(400).json({
            success:false,
            message:"error accur"
        })
    }
  });
  app.post('/appointment' ,async function (req, res) {
    try{
        console.log(req.body);
            const appointment=await Appointment.create(req.body)  
            res.status(200).json({
                success:true,
                message:"Added to Appointment Successfuly",
                appointment
            })
    }
    catch{
        res.status(400).json({
            success:false,
            message:"error accur"
        })
    }
  });
  app.get('/patinet/appointment/:id',async function (req, res) {
    try{
        const appointments=await Appointment.find({patient:req.params.id}).populate("patient").populate("doctor")
        res.status(200).json({
            success:true,
            message:"get all appointments Successfuly",
            appointments
        })
    }
    catch{
        res.status(400).json({
            success:false,
            message:"error accur"
        })
    }
  });
  app.get('/doctor/appointment/:id',async function (req, res) {
    try{
        const appointments=await Appointment.find({doctor:req.params.id}).populate("patient").populate("doctor")
        res.status(200).json({
            success:true,
            message:"get all appointments Successfuly",
            appointments
        })
    }
    catch{
        res.status(400).json({
            success:false,
            message:"error accur"
        })
    }
  });
  app.get('/appointment/all',async function (req, res) {
    try{
        const appointments=await Appointment.find().populate("patient").populate("doctor")
        res.status(200).json({
            success:true,
            message:"get all appointments Successfuly",
            appointments
        })
    }
    catch{
        res.status(400).json({
            success:false,
            message:"error accur",

        })
    }
  });
  app.put('/appointment/update/:id',async function (req, res) {
    try{
        const appointments=await Appointment.findByIdAndUpdate(req.params.id, {...req.body, status:"Completed"}, { new: true })
        res.status(200).json({
            success:true,
            message:"updated",
            appointments
        })
    }
    catch{
        res.status(400).json({
            success:false,
            message:"error accur",

        })
    }
  });


  app.delete('/Appointment',async function (req, res) {
    try{
        const isDeleted=await Appointment.findByIdAndDelete({_id:req.body.id})
        if(isDeleted){
            const AppointmentItems=await Appointment.find({username:req.body.username})
            res.status(400).json({
                success:true,
                message:"Appointment Item delete successfuly",
                AppointmentItems
            })
            
        }else{
            res.status(400).json({
                success:false,
                message:"Appointment Item does not exist",
             
            })
        }
    }
    catch{
        res.status(400).json({
            success:false,
            message:"error accur"
        })
    }
  });

var port = process.env.PORT || 4000;

var server = app.listen(port, function() {
  console.log('Express server listening on port http://localhost:'+port);
});
