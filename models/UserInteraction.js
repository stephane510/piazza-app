const mongoose = require ('mongoose')

const UserInteractionSChema = mongoose.Schema({
    "owner":{
        type:String,
        required:true
    },
    "topic":{
        type:String,
        enum: ['Politics', 'Health', 'Sport', 'Tech'],
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
    "expirationTime":{
        type:Date,
        required:true
    }
})






module.exports = mongoose('userinteractions',UserInteractionsSChema)