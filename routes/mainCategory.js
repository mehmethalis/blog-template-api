const express =require('express');
const router=express.Router();
//jwt middleware
const authenticate=require('../middleware/verify-token');
const MainCategory=require('../models/MainCategory');

//Get all main category
router.get('/',(req,res)=>{
   MainCategory.find({},(err,mainCategories)=>{
      if (err){
          res.json({error:err});
      }else {
          res.json(mainCategories);
      }
   });
});

//Get a main category with id
router.get('/:_id',(req,res)=>{
    const {_id}=req.params;
    MainCategory.find({_id:_id},(err,mainCategory)=>{
        if(err){
            res.json({error:err});
        }else{
            res.json(mainCategory);
        }
    });
});

//Post a main category
router.post('/',authenticate,(req,res)=>{
    const {title,metaTitle,path}=req.body;
    const mainCategory=new MainCategory({title,metaTitle,path});
    mainCategory.save((err,mainCategory)=>{
        if(err){
            res.json({error:err});
        }else{
            res.json(mainCategory);
        }
    })
});

//Update a main category
router.put('/:_id',authenticate,(req,res)=>{
    const {title,metaTitle,path}=req.body;
    const {_id}=req.params;
    MainCategory.findOneAndUpdate(_id,{title:title,metaTitle:metaTitle,path:path}).then(()=>{
        res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

//Delete a main category
router.delete('/:_id',authenticate,(req,res)=>{
    const {_id}=req.params;
    MainCategory.findOneAndRemove(_id).then(()=>{
            res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

module.exports=router;