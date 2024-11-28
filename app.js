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

const MURL = 'mongodb+srv://student_steph16:V7spf6qvQE0p10Wy@cluster0.grukc.mongodb.net/piazza?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(MURL).then(()=>{
    console.log('Your mongoDB connector is on...')
})
app.listen(3001,()=>{
    console.log('Server is up and running...')
})