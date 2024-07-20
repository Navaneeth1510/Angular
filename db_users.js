const { MongoClient } = require('mongodb');
let dbConnection
let uri='mongodb+srv://NavaneethN:N%40va1510av%40N@mindmender.s2p1k4t.mongodb.net/?retryWrites=true&w=majority&appName=MindMender'
let dbname = 'Mind'
module.exports={
    connectToDb:(cb)=>{
        // MongoClient.connect('mongodb+srv://NavaneethN:N%40va1510av%40N@mindmender.s2p1k4t.mongodb.net/my_app')
        MongoClient.connect(uri)
        .then(client=>{
            dbConnection = client.db() //return the database that we r connected to 
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb : ()=>dbConnection
}

