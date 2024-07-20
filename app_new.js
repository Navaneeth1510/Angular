const express = require('express')
const { ObjectId } = require('mongodb')
//shd import the db functions
const {connectToDb, getDb } = require('../amd/db')

const app = express()


//parse anyjson on request so that we can use it in post request
app.use(express.json())

//db connection
let db
//if database connection is successful then we have to start listening on port 3000
//callback function cb is registered here. The args are going to be wither null or err
connectToDb((err)=>{
    if(!err){
        app.listen(4000, ()=>{
            console.log("app listening on port 4000")
        })
        //after we tsart listening we have to get the db into variable
        db = getDb()

    }
    else{
        console.log('Couldnt connect to database')
    }
})


// //to get all books
// app.get('/books',(req, res)=>{
//     let books=[]
//     console.log("In the function successfully")

//     //to connect to specific collection in the database
//     db.collection('books')
//     //.find() returns a cursor. 
//     //toArray and forEach r the 2 methods that can be used
//     //toArray : fetched all documents that the cursor points to 
//     //forEach : allows to iterate each document and process each
//     //docs are sent in batches default is around 100

//     .find()

//     //also returns a cursor
//     //sorts upon author in ascending order
//     .sort({author:1})

//     //asynchronous...takes some time to do
//     .forEach(book => books.push(book))
//     .then(()=>{
//         res.status(200).json(books)
//     })
//     .catch(()=>{
//         res.status(500).json({"error":"Couldnt fetch the documents"})
//     })
// })


//to get a specific book with id
app.get('/books/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then(doc => {
            if (!doc) {
                return res.status(404).json({ error: 'Book not found' });
            }
            res.status(200).json(doc);
        })
        .catch(err => {
            console.error('Error fetching book:', err);
            res.status(500).json({ error: 'Could not fetch the book' });
        });
    }
    else{
        res.status(500).json({"error":"Not a valid Object Id"})
    }

})

//to insert a book onto the db
app.post('/books',(req, res)=>{
    //this is a book object
    const book = req.body
    //shd save it onto the db
    db.collection('books')
    .insertOne(book)
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({"Error":"Couldnt insert the book object"})
    })
})

//to delete a specific book
app.delete('/books/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(doc=>{
            res.status(200).json(doc)
        })
        .catch(err=>{
            res.status(500).json({"error":"Couldnt delete the document"})
        })
    }
    else{
        console.log('Invalid document id')
    }
})


//to update an existing book in the database
app.patch('/books/:id',(req, res)=>{
    const updates = req.body
    if(ObjectId.isValid(req.params.id)){
         db.collection('books')
         .updateOne({_id:new ObjectId(req.params.id)},{$set: updates})
         .then(result=>{
            res.status(200).json(result)
         })
         .catch(err=>{
            res.status(500).json({error:"Couldnt update the book details."})
         })
    }
    else{
        res.status(500).json({error:"Not a valid doc"})
    }
})


// for pagination
app.get('/books',(req, res)=>{
    //getting the query parameter
    const page = req.query.page 

    //decide how many books per page
    const bPpgs = 2

    let books=[]
    db.collection('books')
    .find()

    //use skip method to skip some no of books as per the page
    .skip(page * bPpgs)
    //limit the no of books per page
    .limit(bPpgs)
    .sort({title:1})
    .forEach(book => books.push(book))
    .then(()=>{
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({"error":"Couldnt fetch the documents"})
    })
})