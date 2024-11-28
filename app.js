const express = require ('express')
const app = express ()

const mongoose = require ('mongoose')

const bodyParser = require('body-parser')
const postsRoute = require('./routes/posts')

app.use(bodyParser.json())
app.use('/posts',postsRoute)

app.get('/',(req,res)=>{
    res.send('homepage')
})

app.listen(3000,()=>{
    console.log('Server is up and running...')
})