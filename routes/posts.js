const express = require ('express')
const router = express.Router()

const Post = require('../models/Post')


// router.post('/',async(req,res)=>{
//     console.log(req.body)

// })

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

module.exports = router