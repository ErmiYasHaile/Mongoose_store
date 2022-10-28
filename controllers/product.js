const express = require('express')
const productRouter = express.Router()
const productData = require("../models/seed")
const Product = require('../models/product')

// I N D U C E S - Index New Delete Update Create Edit Show

// INDEX
productRouter.get('/',(req, res)=>{
    Product.find({},(error, allProducts)=>{
    res.render('index.ejs',{products: allProducts})
    })
    // res.render('index.ejs')
})

// NEW
productRouter.get('/new',(req,res)=>{
    res.render('new.ejs')
})
// DELETE
productRouter.delete('/:id',(req, res)=>{
    Product.findByIdAndRemove(req.params.id,(err,detetedProduct)=>{
        console.log(detetedProduct)
        res.redirect('/items')
        // HOW TO REDIRECT TO THE SHOW.EJS instead of redirecting to the index route
    })
    // res.send('DELETE IS GOING TO WORK')
})

// UPDATE
productRouter.put('/:id',(req, res)=>{
    // res.send(req.body
    console.log(req.body)
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedProduct) => {
        console.log(err)
        console.log(updatedProduct)
        
      res.redirect(`/items/${req.params.id}`)  

    })
})

// CREATE
productRouter.post('/',(req, res)=>{
    Product.create(req.body,(error, createdProduct)=>{
        res.redirect('/items');
        // res.send(createdProduct);
    })
    // res.send(req.body)
})
// EDIT
productRouter.get('/:id/edit',(req, res)=>{
    Product.findById(req.params.id,(err, foundedProuduct)=>{
        res.render('edit.ejs',{
            product: foundedProuduct
        })
        // res.send(foundedProuduct)
    })
})


// SHOW
productRouter.get('/:id',(req,res)=>{
    Product.findById(req.params.id,(error,foundedProuduct)=>{
        // res.send(foundedProuduct)
        res.render('show.ejs',{
            product: foundedProuduct
        })
    })
    // res.send('show route is live now on SKYTV')
})
// SEED
productRouter.get("/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {})
    Product.create(productData,(error, data) => {
    res.redirect("/items")
  }
)
})

module.exports = productRouter;