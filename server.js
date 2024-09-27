console.log("Welcome to server");
const express = require('express');
const {errorHandler} =require('./middleware/errorMiddleware');
const connectDB=require('./connect/database')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8000;
const jwt = require('jsonwebtoken')
 const bcrypt = require('bcryptjs')
 const User = require('./models/userModel')




connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.get('/api/tasks', (req, res) => {
//         res.send('Get All Tasks');
//       })

// app.get('/api/tasks', (req, res) => {
//         res.status(200).json({message:'Get All Tasks'});
//       })

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);
      
app.listen(port, () => console.log(`Server listening on
    ${port}`));
    
