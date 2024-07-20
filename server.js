const express = require('express')
const { ObjectId } = require('mongodb')
const {connectToDb, getDb } = require('../amd/db_users')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())


let db
connectToDb((err)=>{
    if(!err){
        app.listen(5000, ()=>{
            console.log("app listening on port 5000")
        })
        db = getDb()

    }
    else{
        console.log('Couldnt connect to database')
    }
})


app.post('/authenticate', (req, res) => {  
  const user = req.body;
  db.collection('User_details')
  .findOne({name: user.name, password: user.password})
  .then(result => {
      if (result) {
          console.log(result);
          res.status(200).json(result);
      } else {
          res.status(401).json({"Error": "Invalid credentials"});
      }
  })
  .catch(err => {
      res.status(500).json({"Error": "Couldn't fetch user details"});
  });
});


//to insert a signup person
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


app.post('/conversations/:userId', (req, res) => {
  const { userId } = req.params;
  const { index, timestamp, messages } = req.body;

  const newConversation = {
    index: index,
    timestamp: timestamp || new Date().toISOString(),
    messages: messages
  };

  db.collection('User_details').findOneAndUpdate(
    { name: userId },
    { $push: { conversations: newConversation } },
    { returnOriginal: false, upsert: true }
  )
  .then(result => {
    if (!result.value) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedConversations = result.value.conversations || [];
    updatedConversations.push(newConversation); // Push the new conversation to the existing array
    res.status(201).json(updatedConversations);
  })
  .catch(err => {
    console.error('Error updating or creating conversation:', err);
    res.status(500).json({ error: 'Internal server error' });
  });
});


  

app.get('/conversations/:userId', (req, res) => {
    const { userId } = req.params;
  
    db.collection('User_details').findOne(
      { name:userId },
      { projection: { conversations: 1 } } 
    )
      .then(result => {
        if (result) {
          res.status(200).json(result.conversations || []);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(err => {
        console.error('Error fetching conversations:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
  
  app.delete('/conversations/:userId/:conversationIndex', (req, res) => {
    const { userId, conversationIndex } = req.params;
    const conversationIdx = parseInt(conversationIndex);

    db.collection('User_details').findOneAndUpdate(
        { name: userId },
        { $pull: { conversations: { index: conversationIdx } } },
        { returnOriginal: false }
    )
    .then(result => {
        if (!result.value) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        console.log('Conversation deleted:', conversationIdx);
        res.status(200).json({ message: 'Conversation deleted successfully' });
    })
    .catch(err => {
        console.error('Error deleting conversation:', err);
        res.status(500).json({ error: 'Internal server error' });
    });
});


  
  