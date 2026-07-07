const mongoose = require('mongoose');

const Product = require('./models/product');


mongoose.connect('mongodb://127.0.0.1:27017/farmStand') 
    .then(()=>{
        console.log("MONGO Connection Open!!!");
    })
    .catch(err =>{
        console.log("Oh no MONGO Connection error!!!");
        console.log(err); 
    })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 100,
        category: 'vegetable',
        image: 'https://images.unsplash.com/photo-1692958208966-9e7bbf3cd12f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Organic Goddess Melon',
        price: 499,
        category: 'fruit',
        image: 'https://images.unsplash.com/photo-1636619299895-ecbb6c9f027f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 399,
        category: 'fruit',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Organic Celery',
        price: 150,
        category: 'vegetable',
        image: 'https://images.unsplash.com/photo-1708436477113-dcabdcb2f4d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 269,
        category: 'dairy',
        image: 'https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?q=80&w=1543&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
]

const seedDB = async() =>{
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
}

seedDB().then(()=>{
    mongoose.connection.close();
})

