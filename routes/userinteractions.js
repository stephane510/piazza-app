const express =require('express')
const router = express.Router()

const Interaction = require('../models/Interaction')
const Post = require('../models/Post')
const verify = require('../verifyToken')

//patch function
router.patch('/id/:postId/userinteractions', verify,async (req, res) => {

    const postId = req.params.postId
    const interactionValue = req.body.interactionValue
    const interactionowner = req.body.owner
    const interactionData = new Interaction({
        owner:req.body.owner,
        interactionValue:req.body.interactionValue,
        postId: postId
    })

    const interactionToSave = await interactionData.save()


    const post = await Post.findById(postId)

    const now = new Date()
    const time = (now.getTime()-post.postRegistration.getTime())/60000
    const remainingTime =  Math.max(post.expirationTime-time,0)
    post.remainTimeExpiration = remainingTime
    
    if (remainingTime == 0 && post.status !== 'Expired' ){
        post.status ='Expired'
    }
    else if (remainingTime > 0 && post.status !== 'Live'){
        post.status ='Live'
    }

    if (post.status == 'Expired') {
        post.status ='Expired'
        post.remainTimeExpiration = 0
    }    
    else if (post.owner == interactionowner){
        return res.send({message:'You cannot interact with your own post'})
    }
    else if (interactionValue == 'likes' && post.status == 'Live') {
        post.likes += 1
    } 
    else if (interactionValue == 'dislikes' && post.status == 'Live') {
        post.dislikes += 1
    } 
    else if (interactionValue == 'comments' && post.status == 'Live') {
        post.comments.push(req.body.comment)
    }
    else {
        
        return res.status(400).send({ message: 'Invalid interaction value' })
    }


    
    const updatedPost = await post.save()

    res.send({ 
        interaction: interactionToSave,
        updatedPost
    }) 
})


//get function
router.get('/id/:postId/userinteractions',verify, async(req,res)=>{
    try{
        const interactionByPostId = await Post.findById(req.params.postId) 
        res.send(interactionByPostId)
    }catch(err){
        res.send({message:err})
    }
})



module.exports = router