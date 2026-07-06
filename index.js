const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');



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


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const categories = ['fruit','vegetable','dairy'];

app.get('/', (req,res)=>{
    res.render('products/home');
});

app.get('/products',async (req,res)=>{
    const { category } = req.query;
    if(category){
        const products = await Product.find({category});
        res.render('products/index',{ products , category});
    }
    else{
        const products = await Product.find({});
        res.render('products/index',{ products ,category: 'All'});
    }
    
})

app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories});
})

app.post('/products', async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show',{product});
})

app.get('/products/:id/edit',async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product, categories});
})

app.delete('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    // console.log(product);
    res.redirect('/products');
})

app.put('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body , {runValidators: true, returnDocument: 'after'});
    res.redirect(`/products/${product._id}`);
})

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})