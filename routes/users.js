const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer  = require('multer');
const { compress } = require('compress-images/promise');
const fs=require('fs');
//jwt middleware
const authenticate=require('../middleware/verify-token');
const User=require('../models/User');

let INPUT_PATH;
let OUTPUT_PATH;
let COMPRESSED_IMG_PATH

//Multer file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./public/images')
  },
  filename: (req, file, cb) => {
    const uniqueName=`${Math.random()}-${Date.now()}.jpg`;
    cb(null, uniqueName);
    INPUT_PATH=`./public/images/${uniqueName}`;
    OUTPUT_PATH=`./public/images/compressed/`;
  }
});

const upload = multer({ storage: storage });

//image compressing
const processImages = async () => {
  const result = await compress({
    source: INPUT_PATH,
    destination: OUTPUT_PATH,
    enginesSetup: {
      jpg: { engine: 'mozjpeg', command: ['-quality', '60']},
      png: { engine: 'pngquant', command: ['--quality=20-50', '-o']},
    }
  });
  const { statistics, errors } = result;
  console.log(statistics);
  COMPRESSED_IMG_PATH=statistics[0].path_out_new;
  console.log('---------------------------------------');
  console.log('errors:'+ errors);
};


// Get all users
router.get('/',authenticate,(req,res)=>{
  User.find({},(err,users)=>{
    if (err){
      res.json({error:err});
    }
    res.json(users);
  });
});

//Get a user with id
router.get('/:_id',authenticate,(req,res)=>{
  const {_id}=req.params;
  User.find({_id:_id},(err,user)=>{
    if (err){
      res.json({error:err});
    }
    res.json(user);

  });
});

//Post a user
router.post('/',authenticate,upload.single('image'),(req,res)=>{
  const {name,surname,username,email,password}=req.body;

  if (COMPRESSED_IMG_PATH){
    processImages().then(()=>{
      //image encoded
      const photo={data:fs.readFileSync(COMPRESSED_IMG_PATH),contentType:'jpeg'};

      //hash password with bcrypt
      bcrypt.hash(password, 10, (err,hash)=>{
        const user=new User({name,surname,username,email,password:hash,photo:photo});
        user.save((err,user)=>{

          //delete uploaded files
          fs.unlink(INPUT_PATH,(err)=>{
            if (err) console.log(err);
          });
          fs.unlink(COMPRESSED_IMG_PATH,(err)=>{
            if(err) console.log(err);
          });

          if(err){
            console.log(err);
            res.json({status:0,error:err});
          }
          else {
            res.json({status:1,user:user});
          }
        });
      });
    }).catch((err)=>{
      console.log(err)
    });

  }else{
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
  }

});


//Update a user with id
router.put('/:_id',authenticate,upload.single('image'),(req,res)=>{
  const {name,surname,username,email,password}=req.body;
  const {_id}=req.params;

  if(COMPRESSED_IMG_PATH){
    processImages().then(()=> {
      //image encoded
      const photo = {data: fs.readFileSync(COMPRESSED_IMG_PATH), contentType: 'jpeg'};

      if(password){
        //hash password with bcrypt
        bcrypt.hash(password, 10, (err,hash)=>{
          User.findByIdAndUpdate(_id,{name,surname,username,email,password:hash,photo:photo}).then(()=>{
            res.json({status:1});
          }).catch((err)=>{
            res.json({status:0,error:err})
          });

        });
      }else{
        User.findByIdAndUpdate(_id,{name,surname,username,email,photo:photo}).then(()=>{
          res.json({status:1});
        }).catch((err)=>{
          res.json({status:0,error:err})
        });
      }

    });

  }else{
    if(password){
      //hash password with bcrypt
      bcrypt.hash(password, 10, (err,hash)=>{
        User.findByIdAndUpdate(_id,{name,surname,username,email,password:hash}).then(()=>{
          res.json({status:1});
        }).catch((err)=>{
          res.json({status:0,error:err})
        });

      });
    }else{
      User.findByIdAndUpdate(_id,{name,surname,username,email}).then(()=>{
        res.json({status:1});
      }).catch((err)=>{
        res.json({status:0,error:err})
      });
    }
  }


});

//Delete a user with id
router.delete('/:_id',authenticate,(req,res)=>{
  const {_id}=req.params;
  User.findOneAndRemove(_id).then(()=>{
    res.json({status:1});
  }).catch((err)=>{
    res.json({status:0,error:err});
  });
});


module.exports = router;
