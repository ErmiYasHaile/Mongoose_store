const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')



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

//MIDDLEWARE
app.use(express.urlencoded({extended: true}))

// I N D U C E S - Index New Delete Update Create Edit Show


//INDEX
app.get('/items',(req, res)=>{
    Product.find({},(error, allProducts)=>{
    res.render('index.ejs',{products: allProducts})
    })
    // res.render('index.ejs')
})

// NEW
app.get('/items/new',(req,res)=>{
    res.render('new.ejs')
})

//CREATE
app.post('/items',(req, res)=>{
    Product.create(req.body,(error, createdProduct)=>{
        res.redirect('/items');
        // res.send(createdProduct);
    })
    // res.send(req.body)
})


//SHOW
app.get('/items/:id',(req,res)=>{
    Product.findById(req.params.id,(error,foundedProuduct)=>{
        // res.send(foundedProuduct)
        res.render('show.ejs',{
            product: foundedProuduct
        })
    })
    // res.send('show route is live now on SKYTV')
})


app.listen(PORT, ()=>
console.log(`SERVER IS WORKING ON ${PORT}`))