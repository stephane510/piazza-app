const mongoose = require('mongoose')

const UserInteractionSchema = mongoose.Schema({
    "owner":{
        type:String,
        required:true
    },
    "interactionValue":{
        type:String,
        enum: ['likes', 'dislikes', 'comments'],
        required:true
    },
    'postId': { 
        type: mongoose.Schema.Types.ObjectId
    },
    'timestamp':{
        type: Date,
        default: Date.now 
    }
    // "remainTimeExpiration":{
    //     type:Number,
    //     default: function() {
    //     const now = new Date
    //     const time = (now.getTime()-this.Post.postRegistration.getTime())/60000
    //     const remainTime =  time - this.Post.expirationTime
    //     if (remainTime>0){
    //         return remainTime
    //     }    
    //     else return 0
    //     }
    // }           
})


module.exports = mongoose.model('Interaction', UserInteractionSchema)

