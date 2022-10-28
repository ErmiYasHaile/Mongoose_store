const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Product = require('./models/product')
const productcontroller = require("./controllers/product")


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

// MIDDLEWARE
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use("/items", productcontroller)
// I N D U C E S - Index New Delete Update Create Edit Show


app.listen(PORT, ()=>
console.log(`SERVER IS WORKING ON ${PORT}`))