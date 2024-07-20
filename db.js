//MongoClient allows us to connect to the database
const { MongoClient } = require('mongodb')

let dbConnection

//to export things in node application we use
module.exports = {
    //to establish connection with the database
    //here, cb is the callback function that is to be executed once the db connection is established
    connectToDb : (cb) => {
        MongoClient.connect('mongodb://localhost:27017/Bookstore') //takes in connection string + db name as  arguement
        //is an asynchronous method and takes some time 
        //can fire a function once this is complete
        .then((client) => {
            //extract and store the db onto variable
            dbConnection = client.db() //return the database that we r connected to 
            return cb()
        })
        //if any error while trying to connect
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    //return the database connection. this value can be used to communicate with the database 
    getDb : () => dbConnection
}