const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/shop")

const productSchema = new mongoose.Schema({
    title:String,
    content:String
})
 
const Product = mongoose.model("Product" ,productSchema)


app.route("/products")

.get(function(req,res){
    Product.find(function(err,result){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

.post(function(req,res){
    const newProduct = new Product({
        title: req.body.name,
        content: req.body.content
    })
    newProduct.save(function(err){
        if(!err){
            res.send("added succesfully")
        }else{
            res.send(err)
        }
    })
})

.delete();

/////////request for specific article////////

app.route("/products/:productTitle")

.get(function(req,res){
    Article.findOne({title:req.params.productTitle},function(err,foundProduct){
        if(!err){
            res.send(foundProduct)
        }else{
            console.log(err)
        }
    })
})

.put(function(req,res){
    Article.updateOne({title:req.params.productTitle},
        {title:req.body.title,content:req.body.content},

        function(err){
            if(!err){
                res.send("Succesfully updated .")
            }else{
                console.log(err)
            }
        })
})

.patch(function(req,res){
    Article.updateOne({title:req.params.productTitle},
        {$set:req.body},function(err){
            if(!err){
                res.send("Successfully updated")
            }else{
                res.send(err)
            }
        })
})

.delete(function(req,res){
    Article.deleteOne({title:req.params.productTitle},
        {$set :req.body},
        function(err){
            if(!err){
                res.send("deleted successfully")
            }else{
                res.send(err)
            }
        }
        
        )
});








app.listen(4600,()=>console.log("server started at port 4600"))