const express =require('express')
const router = express.Router()

const Interaction = require('../models/Interaction')
const Post = require('../models/Post')

//post function
router.patch('/:postId/userinteractions', async (req, res) => {

    const postId = req.params.postId
    const interactionValue = req.body.interactionValue
    const interactionData = new Interaction({
        owner:req.body.owner,
        interactionValue:req.body.interactionValue,
        postId: postId
    })

    try{
        const interactionToSave = await interactionData.save()
        res.send(interactionToSave)
    }catch(err){
        res.send({message:err})
    }

    const post = await Post.findById(postId)

    if (interactionValue == 'likes') {
        post.likes += 1;
    } else if (interactionValue == 'dislikes') {
        post.dislikes += 1;
    } 
    else if (interactionValue == 'comments') {
        post.commments = Post.commments
    } 
    else {
        return res.status(400).send({ message: 'Invalid interaction value' })
    }

    const updatedPost = await post.save()

})
//get function
router.get('/:postId/userinteractions', async(req,res)=>{
    try{
        const interactionByPostId = await Interaction.find() 
        res.send(interactionByPostId)
    }catch(err){
        res.send({message:err})
    }
})



module.exports = router