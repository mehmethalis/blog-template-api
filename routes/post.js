const express=require('express');
const router=express.Router();
const multer  = require('multer');
const { compress } = require('compress-images/promise');
const fs=require('fs');
//jwt middleware
const authenticate=require('../middleware/verify-token');
const Post=require('../models/Post');

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


//Get all posts
router.get('/',authenticate,(req,res)=>{
    Post.find({},(err,posts)=>{
        if (err){
            res.json({error:err});
        }else{
            res.json(posts);
        }
    });
});

//Get a post with id
router.get('/:_id',authenticate,(req,res)=>{
    const {_id}=req.params;

    Post.findById(_id,(err,post)=>{
        if (err){res.json({error:err})}else {res.json(post)}
    });
});

//Post a post
router.post('/',authenticate,upload.single('cover'),(req,res)=>{
    const {userId,subCategoryId,title,text}=req.body;

    processImages().then(()=>{
        //image encoded
        const coverImage={data:fs.readFileSync(COMPRESSED_IMG_PATH),contentType:'jpeg'};
        const post=new Post({userId:userId,subCategoryId:subCategoryId,title:title,text:text,coverImage:coverImage});

        post.save((err,post)=>{
            if(err){
                console.log(err);
                res.json({status:0,error:err});
            }
            else {
                res.json({status:1,post:post});
            }
        });
        //delete uploaded files
        fs.unlink(INPUT_PATH,(err)=>{
            if (err) console.log(err);
        });
        fs.unlink(COMPRESSED_IMG_PATH,(err)=>{
            if(err) console.log(err);
        });
    }).catch((err)=>{
        console.log(err)
    });

});

//Updated post with id
router.put('/:_id',authenticate,upload.single('cover'),(req,res)=>{
    const {userId,subCategoryId,title,text}=req.body;
    const {_id}=req.params;
    processImages().then(()=>{
        //image encoded
        const coverImage={data:fs.readFileSync(COMPRESSED_IMG_PATH),contentType:'jpeg'};

        Post.findOneAndUpdate(_id,{userId:userId,subCategoryId,title:title,text:text,coverImage:coverImage}).then(()=>{
            res.json({status:1});
        }).catch((err)=>{
            res.json({status:0,error:err})
        });

        //delete uploaded files
        fs.unlink(INPUT_PATH,(err)=>{
            if (err) console.log(err);
        });
        fs.unlink(COMPRESSED_IMG_PATH,(err)=>{
            if(err) console.log(err);
        });
    }).catch((err)=>{
        console.log(err)
    });

});

//Delete a post with id
router.delete('/:_id',authenticate,(req,res)=>{
    const {_id}=req.params;
    Post.findOneAndRemove(_id).then(()=>{
        res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

module.exports = router;