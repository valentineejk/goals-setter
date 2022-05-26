const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')

// @desc Register New User
// @route POST /api/users
//@access Private
const registerUser=asyncHandler(async (req,res) => {

    const {name,email,password}=req.body

    if(!name||!email||!password) {
        res.status(400)
        throw new Error('please add new fields')
    }

    //UserCheck
    const userExist=await User.findOne({email});
    if(userExist) {
        res.status(400)
        throw new Error('user already exist')
    }

    //hash
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //createUser

    const user=await User.create({
        name,
        email,
        password: hashedPassword,
    })

    //usercreated

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id,)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User')
    }

})




// @desc Auth New User
// @route POST /api/login
//@access Private
const loginUser=asyncHandler(async (req,res) => {

    const {email,password}=req.body
    const user=await User.findOne({email})

    if(user&&(await bcrypt.compare(password,user.password))) {
        res.json({

            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id,)



        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }

    res.json({
        message: 'Login User'
    })
})

// @desc Get Users
// @route GET /api/users/me
//@access Private
const getMe=asyncHandler(async (req,res) => {
    const {_id,name,email}=await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//generate JWT

const generateToken=(id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',

    })
}

module.exports={
    registerUser,
    loginUser,
    getMe

}