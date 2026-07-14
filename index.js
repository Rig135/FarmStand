const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const AppError = require('./AppError');

const Product = require('./models/product');


mongoose.connect('mongodb://127.0.0.1:27017/farmStand') //returns a promise
    .then(()=>{
        console.log("MONGO Connection Open!!!");
    })
    .catch(err =>{
        console.log("Oh no MONGO Connection error!!!");
        console.log(err); 
    })

app.engine('ejs',ejsMate);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const categories = ['fruit','vegetable','dairy'];

app.get('/', (req,res)=>{
    res.render('products/home');
});

app.get('/products',async (req,res,next)=>{
    try{
        const { category } = req.query;
        if(category){
            const products = await Product.find({category});
            res.render('products/index',{ products , category});
        }
        else{
            const products = await Product.find({});
            res.render('products/index',{ products ,category: 'All'});
        }
    } catch(e){
        next(e);
    }
    
})

app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories});
})

app.post('/products', async (req,res,next)=>{
    try{
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect(`/products/${newProduct._id}`);
    }catch(e){
        next(e);
    }
})

app.get('/products/:id', async (req,res,next)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            throw new AppError('Product Not Found!',404);
        }
        res.render('products/show',{product});
    } catch(e){
        next(e);
    }
})

app.get('/products/:id/edit',async (req,res,next)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            throw new AppError('Product Not Found',404);
        }
        res.render('products/edit',{product, categories});
    } catch(e){
        next(e);
    }
})

app.delete('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    // console.log(product);
    res.redirect('/products');
})

app.put('/products/:id', async (req,res,next)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body , {runValidators: true, returnDocument: 'after'});
        res.redirect(`/products/${product._id}`);
    } catch(e){
        next(e);
    }
    
})

app.use((err,req,res,next)=>{
    const {status = 500, message = "Something went wrong"} = err;
    res.status(status).send(message);
})

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})