const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const auth=require("./middleware/auth.js")
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const userRoutes = require('./routes/userRoutes');
const registrationController = require('./routes/registrationRoutes');
const createProvider = require('./routes/providerRouter')
const dbUri = `mongodb+srv://shafisadique123:shafisadique123@cluster0.brlacya.mongodb.net/casino?ssl=true&tls=true
`;

// let dbUri='mongodb://127.0.0.1:27017/test'

app.use(express.json());
app.use('/login', userRoutes);
app.use('/register',registrationController)
app.use('/api',auth,createProvider);
app.get("/good", (req, res) => res.send("API Running"));

app.use(bodyParser.json());

// connect to db
const connect=async ()=>{
 await mongoose.connect(dbUri,{useNewUrlParser:true,useUnifiedTopology:true})
 .then((response)=>{
  console.log('Connected to MongoDB Atlas');
 })
 .catch((error)=>{
  console.error.bind(console, 'connection error:')
 })

}
connect();
const db = mongoose.connection;
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


// ...rest of your code
