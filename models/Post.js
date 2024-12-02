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
        type: [String]
    },
    "furtherInformation":{
        type: String 
    },
    "remainTimeExpiration":{
        type: Number 
    }
})

    
//         PostSChema.virtual('remainTimeExpiration').get(function() {
//         const now = new Date
//         const time = (now.getTime()-this.postRegistration.getTime())/60000
//         const remainTime =  time - this.expirationTime
//         if (remainTime>0){
//             return remainTime
//         }    
//         else return 0     
// })


module.exports = mongoose.model('Post', PostSChema)