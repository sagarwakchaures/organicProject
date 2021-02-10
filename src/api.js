const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;
const config = require('./config/db');
const errorLogger = require('./middleware/errorLogger');
const verifyToken = require('./middleware/verifyToken');
const checkRequest = require('./middleware/checkRequest');
const indexController = require('./controller/indexController');

app.use(bodyParser.json());//append the request in body
app.use(cors());//Support for cross origin resource sharing

//Create the database connection
const mongoDB = process.env.MONGODB_URI || config.mongodbUrl;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
   throw new Error(err);
});
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
});
//end

//request handler middleware 
app.use(checkRequest);

//verify the token middleware
app.use(verifyToken);

//routing handler middleware
app.use('/',indexController);

//Error handling middleware
app.use(errorLogger);

app.listen(PORT, function(err){ 
    if (err) console.log("Error in server setup") 
    console.log("Server listening on Port", PORT); 
}); 






