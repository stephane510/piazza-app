const mongoose = require('mongoose')

const UserInteractionSchema = mongoose.Schema({
    "owner":{
        type:String,
        required:true
    },
    "interaction value":{
        type:String,
        enum: ['likes', 'dislikes', 'comments'],
        required:true
    },
    "expirationTime":{
        type:Number,
        required:true
    },
    'timestamp':{
        type: Date,
        default: Date.now 
    }       
})


module.exports = mongoose.model('UserInteraction', UserInteractionSchema)

