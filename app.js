const express = require ('express')
const app = express ()

const mongoose = require ('mongoose')
require('dotenv/config')

const bodyParser = require('body-parser')
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

app.use(bodyParser.json())
app.use('/user',authRoute)
app.use('/posts',postsRoute)

app.get('/',(req,res)=>{
    res.send('homepage')
})

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Your mongoDB connector is on...')
})
app.listen(3001,()=>{
    console.log('Server is up and running...')
})