const express = require('express')
const app = express()
const mongoose = require('mongoose')

// const store = require('./models/store')

require('dotenv').config()

const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//// DATABASE
const db = mongoose.connection
db.on('error',(err) => console.log(err.message))
db.on('connected',()=> console.log('mongo connected'))
db.on('disconnected',()=>console.log('mongo disconnected'))

// I N D U C E S - Index New Delete Update Create Edit Show

//CREATE
app.post('/',(req, res)=>{
    res.send('received')
})



app.listen(PORT, ()=>
console.log(`SERVER IS WORKING ON ${PORT}`))