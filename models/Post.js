const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Post=new Schema({

    userId:{
        type:String,
        require: true
    },
    subCategoryId:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    },
    coverImage:{
        type:Buffer,
        contentType:String
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('post',Post);