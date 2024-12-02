const express =require('express')
const router = express.Router()

const Interaction = require('../models/Interaction')
const Post = require('../models/Post')

//patch function
router.patch('/:postId/userinteractions', async (req, res) => {

    const postId = req.params.postId
    const interactionValue = req.body.interactionValue
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
    
    if (remainingTime == 0 && post.status !== 'Expired'){
        post.status ='Expired'
    }
    else if (remainingTime > 0 && post.status !== 'Live'){
        post.status ='Live'
    }

    if (post.status == 'Expired') {
        post.status ='Expired'
        post.remainTimeExpiration = 0
    }
    else if (interactionValue == 'likes' && post.status == 'Live') {
        post.likes += 1
    } else if (interactionValue == 'dislikes' && post.status == 'Live') {
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
router.get('/:postId/userinteractions', async(req,res)=>{
    try{
        const interactionByPostId = await Post.findById(req.params.postId) 
        res.send(interactionByPostId)
    }catch(err){
        res.send({message:err})
    }
})



module.exports = router