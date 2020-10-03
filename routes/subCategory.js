const express =require('express');
const router=express.Router();
//jwt middleware
const authenticate=require('../middleware/verify-token');
const SubCategory=require('../models/SubCategory');

//Get all sub category
router.get('/',(req,res)=>{
    SubCategory.find({},(err,subCategories)=>{
        if (err){
            res.json({error:err});
        }else {
            res.json(subCategories);
        }
    });
});

//Get a sub category with id
router.get('/:_id',(req,res)=>{
    const {_id}=req.params;
    SubCategory.find({_id:_id},(err,subCategories)=>{
        if(err){
            res.json({error:err});
        }else{
            res.json(subCategories);
        }
    });
});

//Post a sub category
router.post('/',authenticate,(req,res)=>{
    const {mainCategoryId,title,metaTitle,path}=req.body;
    const subCategories=new SubCategory({mainCategoryId,title,metaTitle,path});
    subCategories.save((err,subCategories)=>{
        if(err){
            res.json({error:err});
        }else{
            res.json(subCategories);
        }
    })
});

//Update a sub category
router.put('/:_id',authenticate,(req,res)=>{
    const {mainCategoryId,title,metaTitle,path}=req.body;
    const {_id}=req.params;
    SubCategory.findOneAndUpdate(_id,{mainCategoryId:mainCategoryId,title:title,metaTitle:metaTitle,path:path}).then(()=>{
        res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

//Delete a sub category
router.delete('/:_id',authenticate,(req,res)=>{
    const {_id}=req.params;
    SubCategory.findOneAndRemove(_id).then(()=>{
        res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

module.exports=router;