const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const MainCategorySchema=new Schema({
    title:{
        type:String,
        require:true
    },
    metaTitle:{
        type:String,
        require:true
    },
    path:{
        type:String,
        require:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('mainCategorySchema',MainCategorySchema);