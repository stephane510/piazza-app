const mongoose = require('mongoose')

const PostSChema = mongoose.Schema({
    "title":{
        type:String,
        required:true
    },
    "topic":{
        type:String,
        enum: ['Politics', 'Health', 'Sport', 'Tech'],
        required:true
    },    
    "postRegistration":{
        type:Date,
        default: Date.now,
        required:true
    },
    "message":{
        type:String,
        required:true
    },
    "expirationTime":{
        type:Number,
        required:true
    },
    "status":{
        type:String,
        enum: ['Live','Expired'],default:'Live',
        required:true
    },
    "owner":{
        type:String,
        required:true
    },
    "likes":{
        type:Number, default:0
    },
    "dislikes":{
        type:Number,default :0
    },
    "comments":{
        type: String
    },
    "furtherInformation":{
        type: String 
    }


})

module.exports = mongoose.model('Post', PostSChema)