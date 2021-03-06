const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
//env
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/***User Register Form */
router.get('/register', (req,res)=>{
  res.render('register', { title: 'Register' });
});

/* User register post endpoint */
router.post('/register', function(req, res, next) {
  const {name,surname,username,email,password}=req.body;

  //hash password with bcrypt
  bcrypt.hash(password, 10, (err,hash)=>{
    const user=new User({name,surname,username,email,password:hash});
    user.save((err,user)=>{

      if(err){
        console.log(err);
        res.json({status:0,error:err});
      }
      else {
        res.json({status:1,user:user});
      }
    });
  });
});


router.post('/authenticate',(req,res)=>{
  const {username,password} =req.body;
  
  User.findOne({username},(err,user)=>{
    if(err) throw err;
    
    if(!user){
      res.json({status:0,message:'Authenticate failed,user not found.'});
    }else{
      const match = bcrypt.compare(password, user.password);
      if(match){
        const payload={username};
        const token=jwt.sign(payload,process.env.API_SECRET_KEY,{expiresIn: 720 /*12 hour*/});
        res.json({status:1,token:token});
      }else{
        res.json({status:0,message:'Authenticate failed,wrong password.'})
      }
    }
  });

})


module.exports = router;
