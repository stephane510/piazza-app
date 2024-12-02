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
        
})


module.exports = mongoose.model('Interaction', UserInteractionSchema)

