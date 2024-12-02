const express = require ('express')
const router = express.Router()

const Post = require('../models/Post')





router.post('/',async(req,res)=>{

    const postData = new Post({
        title:req.body.title,
        topic:req.body.topic,
        message:req.body.message,
        expirationTime:req.body.expirationTime,
        owner:req.body.owner
})

    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})




router.get('/', async (req,res) =>{ 
    try{
        const posts = await Post.find() 
        res.send(posts)
    }catch(err){
        res.send({message:err})
    }
})

router.get('/:postId', async(req,res)=>{
    try{
        const postById = await Post.findById(req.params.postId)
        res.send(postById)
    }catch(err){
        res.send({message:err})
    }

})

router.patch('/:postId', async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                title:req.body.title,
                topic:req.body.topic,
                message:req.body.message,
                expirationTime:req.body.expirationTime,
                owner:req.body.owner
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})






module.exports = router