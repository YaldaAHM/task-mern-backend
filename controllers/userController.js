const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
 const bcrypt = require('bcryptjs')



 const registerUser = asyncHandler(async (req, res) => {
   
    console.log('ddgf1')
    const { name, email, password } = req.body
    console.log('ddgf2'+name+email+password)
    if (!name || !email || !password) {
        console.log('ddgf33')
        res.status(400)
        console.log('ddgf3')
        throw new Error('All fields are mandatory')
    }
    const userExists = await User.findOne({ email })
    console.log('ddgf4')
    if (userExists) {
        console.log('ddgf5')
        res.status(400)
        throw new Error('User Exists')
    }
    console.log('ddgf6')
    const salt = await bcrypt.genSalt(10)
    console.log('ddgf7')
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log('ddgf8')
    const user = await User.create({ name, email, password:
    hashedPassword })
    console.log('ddgf9')
    if (user) {
        console.log('ddgf10')
     res.status(201).json({ _id: user.id, name: user.name, email:
     user.email,token:generateJWTtoken(user._id)})
     console.log('ddgf11')
    } else {
        console.log('ddgf12')
     res.status(400)
     throw new Error('Invalid user data')
   }

    //console.log('ddgf6')
    //res.json({ message: 'Register User successful' })
}) 


 const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
     res.json({ _id: user.id, name: user.name, email: user.email
        ,token:generateJWTtoken(user._id)
      })
    } else {
     res.status(400)
     throw new Error('Invalid data')
   }
   //res.json({ message: 'Login User successful' })
})
 const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
 res.status(200).json({ id: _id, name, email })
   //res.json({ message: 'Current user data' })
 })
 const generateJWTtoken = id => jwt.sign({ id },
    process.env.JWT_SECRET, { expiresIn: '5d' })
 module.exports = { registerUser, loginUser, getCurrentUser }