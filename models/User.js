const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    surname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});

module.exports=mongoose.model('user',UserSchema);