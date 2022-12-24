const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const register = require('./routes/register')
const login = require('./routes/login')
const productsRoute = require('./routes/products');
const app = express();
const { fisrtSectionImgApi, drinks, fruit, fish, chicken, icecream  } = require('./dataapi');
const path = require('path')



require("dotenv").config();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())

app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/products', productsRoute)


app.get('/fisrtSectionImgApi',(req,res)=>{
    res.status(201).send(fisrtSectionImgApi)
})
app.get('/drinks',(req,res)=>{
    res.status(201).send(drinks)
})
app.get('/fruit',(req,res)=>{
    res.status(201).send(fruit)
})
app.get('/fish',(req,res)=>{
    res.status(201).send(fish)
})
app.get('/chicken',(req,res)=>{
    res.status(201).send(chicken)
})
app.get('/icecream',(req,res)=>{
    res.status(201).send(icecream)
})

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

if(process.env.NODE_ENV === "production"){
    app.use(express.static("my_pp/build"));
    app.get('*',(req,res)=>{
       res.sendFile(path.resolve(__dirname, 'my_pp','build','index.html'));
    })
}
app.listen(port, console.log(`server is listening on localHost ${port}`));
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=> console.log("MogoDB connection successful..."))
.catch((err)=>console.log("MongoDB connection failed", err.message));