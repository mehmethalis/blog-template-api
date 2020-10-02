const express=require('express');
const router=express.Router();
//jwt middleware
const authenticate=require('../middleware/verify-token');

const Comment =require('../models/Comment');
//Get all comment
router.get('/',(req,res)=>{
    Comment.find({},(err,comments)=>{
        if (err){
            res.json({error:err});
        }else {
            res.json(comments);
        }
    });
});

//Get a comment with id
router.get('/:_id',(req,res)=>{
    const {_id}=req.params;
    Comment.find({_id:_id},(err,comment)=>{
        if(err){
            res.json({error:err});
        }else{
            res.json(comment);
        }
    });
});

//Post a comment
router.post('/',authenticate,(req,res)=>{
    const {postId,userId,comment,isApproved}=req.body;

    const comment_obj=new Comment({postId,userId,comment,isApproved});
    comment_obj.save((err,comment)=>{
        if(err){
            res.json({error:err});
        }else{
            res.json(comment);
        }
    })
});

//Update a comment
router.put('/:_id',authenticate,(req,res)=>{
    const {postId,userId,comment,isApproved}=req.body;
    const {_id}=req.params;
    Comment.findOneAndUpdate(_id,{postId:postId,userId:userId,comment:comment,isApproved:isApproved}).then(()=>{
        res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

//Delete a comment
router.delete('/:_id',authenticate,(req,res)=>{
    const {_id}=req.params;
    Comment.findOneAndRemove(_id).then(()=>{
        res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

module.exports=router;