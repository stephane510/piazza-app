const express = require ('express')
const router = express.Router()













// router.patch('/:postId', async(req,res) =>{
//     try{
//         const updatePostById = await Post.updateOne(
//             {_id:req.params.postId},
//             {$set:{
//                 title:req.body.title,
//                 topic:req.body.topic,
//                 message:req.body.message,
//                 expirationTime:req.body.expirationTime,
//                 owner:req.body.owner
//                 }
//             })
//         res.send(updatePostById)
//     }catch(err){
//         res.send({message:err})
//     })

module.exports = router