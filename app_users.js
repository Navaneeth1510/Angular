const express = require('express')
const { ObjectId } = require('mongodb')
const {connectToDb, getDb } = require('../amd/db_users')
// const cors = require('cors')

const app = express()
app.use(express.json())
// app.use(cors)

let db
connectToDb((err)=>{
  if(!err){
      app.listen(3000, ()=>{
          console.log("app listening on port 3000")
      })
      //after we tsart listening we have to get the db into variable
      db = getDb()

  }
  else{
      console.log('Couldnt connect to database')
  }
})

app.get('/users', (req, res) => {  // Changed route path to '/users/:id'
    console.log('db:', db);
    if (!db) {
      return res.status(500).json({ error: 'Database connection not established' });
    }
    let users=[]
    db.collection('User_details')
      .find()
      .sort({name:1})
      .forEach(user => users.push(user))
      .then(result => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({ error: "something goin wrong" });
      });
  });

  app.post('/users',(req, res)=>{
    const book = req.body
    db.collection('User_details')
    .insertOne(book)
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({"Error":"Couldnt insert the book object"})
    })
})

app.post('/insert',(req, res)=>{
  const user = req.body
  db.collection('User_details')
  .insertOne(user)
  .then(result=>{
    console.log(result)
    res.status(200).json(result)
  })
  .catch(err=>{
    res.status(500).json({"Error":"Couldnt insert the book object"})
  })
})

