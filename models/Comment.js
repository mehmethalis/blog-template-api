const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Comment=new Schema({
    postId:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }

});

module.exports=mongoose.model('comment',Comment);