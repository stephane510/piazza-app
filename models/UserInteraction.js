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


})






module.exports = mongoose('userinteractions',UserInteractionsSChema)