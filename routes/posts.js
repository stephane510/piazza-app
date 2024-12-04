const express = require ('express')
const router = express.Router()

const Post = require('../models/Post')
const verify = require('../verifyToken')




router.post('/',verify,async(req,res)=>{

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




router.get('/', verify, async (req,res) =>{ 
    try{
        const posts = await Post.find() 
        res.send(posts)
    }catch(err){
        res.send({message:err})
    }
})

router.get('/id/:postId', verify,async(req,res)=>{
    try{
        const postById = await Post.findById(req.params.postId)
        res.send(postById)
    }catch(err){
        res.send({message:err})
    }

})

router.get('/topic/:postTopic', verify,async(req,res)=>{
    try{
        const postByTopic = await Post.find({ topic: req.params.postTopic })
        res.send(postByTopic)
    }catch(err){
        res.send({message:err})
    }

})

router.get('/highest-interest/:postTopic', verify, async (req, res) => {
        const posts = await Post.find({ topic: req.params.postTopic, status: 'Live' })
        .sort({ totalInteractions: -1 })
        .limit(1)
        if (posts.length == 0) {
            return res.send({ message: 'No available live posts' })
    }
    res.send(posts[0])
})

router.get('/topic/:postTopic/:postStatus', verify,async(req,res)=>{
    try{
        const postByTopicStatus = await Post.find({ topic: req.params.postTopic,status: req.params.postStatus })
        res.send(postByTopicStatus)
    }catch(err){
        res.send({message:err})
    }

})


router.patch('/:postId', verify,async(req,res) =>{
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