//first we will require express
const express = require('express')

//initialize the app
//also middleware
const app = express()

//shd listen on a specific port number
//()=>{} here we fire a function once started for listening for requests
app.listen(3000, ()=> {
    console.log('app listening on port 3000')
})

//setup all different route handlers
//get request handler
app.get('/books', (req, res)=>{
    //to send back a json response
    res.json({msg:"welcome to the api"})
})

//to run this application, we use nodemon 
//nodemon acts as the development server to fire up the application
//npm install -g nodemon
//nodemon app

//now we need to install mongodb node drivers onto the project
//npm install mongodb --save