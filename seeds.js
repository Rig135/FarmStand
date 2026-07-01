const mongoose = require('mongoose');

const Product = require('./models/product');


mongoose.connect('mongodb://127.0.0.1:27017/farmStand') //returns a promise
    .then(()=>{
        console.log("MONGO Connection Open!!!");
    })
    .catch(err =>{
        console.log("Oh no MONGO Connection error!!!");
        console.log(err); 
    })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 140,
//     category: 'fruit'
// })

// p.save().then(p=>{
//     console.log(p);
// }).catch(e =>{
//     console.log(e);
// })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 100,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 499,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 399,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 150,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 269,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(e =>{
    console.log(e);
})