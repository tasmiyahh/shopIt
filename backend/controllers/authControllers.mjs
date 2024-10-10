
import User from "../models/user.mjs"

import catchAsyncErrors from "../middlewares/catchAsyncErrors.mjs" // yahan function bnaya or isko export kiya route pe or route ko export kiye server.mjs pe
import jwt from 'jsonwebtoken'

import ErrorHandler from "../utils/errorHandler.mjs"
import sendToken from "../utils/sendToken.mjs"
import sendEmail from "../utils/sendEmail.mjs"
import { getRestPasswordTemplate } from "../utils/emailTemplete.mjs"
import crypto from "crypto"



//register user // /api/register
export const registerUser = catchAsyncErrors(async(req,res,next)=>{
const {name , email, password} = req.body

const user = await User.create({
    name ,email ,password
})

sendToken(user , 201 ,res)   //cookie kliye alg pg bnaya h sendtken os me token save krwa diya 
})

//login user // /api/login
// export const loginUser = catchAsyncErrors (async(req,res,next)=>{
//     const { email, password} = req.body
// if(!email || !password){
//     return next(new ErrorHandler('please enter email and password' , 400))}

//       //find user in database
//     const user = await User.findOne({email}).select("+password")

//     if(!user){
//         return next(new ErrorHandler("invalid email or password" , 401))
//     }
// //check pass is correct
//     const isPaswordMatched = await user.comparePassword(password) //ye pass j oenter kiya osko hum ne model waly pg pe lia h


//     if(!isPaswordMatched){
//         return next(new ErrorHandler("invalid email or password" , 401))
//     }
   


//    sendToken(user , 200 ,res) //send token wali file me cookie bna k os me token sve krwaya h or os comp ko yahan se 3 cheezy d h

 

// })
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
    // Check if email and password were provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }
  
    // Find user by email
    const user = await User.findOne({ email }).select("+password");  // +password to explicitly include password field
  
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    // Check if password matches
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",  // Token expires in 1 hour
    });

    //store in cookie
  res.cookie('token', token, {
    httpOnly: true,      // Ensures the cookie is only accessible via HTTP requests
    //secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    maxAge: 3600000,     // 1 hour in milliseconds
  });

  
   
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  };
 
 
    
 
 
  



export const logoutUser = catchAsyncErrors(async (req,res,next)=>{ // inorder to logout hum cookie me tokn h osko empty krden g tw token khatm hoty he aplog out hojao g
    res.cookie("Token" , null , {
        expires : new Date(Date.now()) //logout right now
    } )

    res.status(200).send({
        messagee : "logout"
    })


})


export const forgotPassword = catchAsyncErrors(async (req,res,next)=>{
//find user in database
const user = await User.findOne({email :req.body.email})

if(!user){
    return next(new ErrorHandler("user not found with this email" ,404))
}

//get reset password token and save it in database
const resetToken = user.getResetPasswordToken()
await user.save()


//create reset password url so that user reset pasword with this ul
const resetUrl = `${process.env.FRONTEND_URL}/api/password/reset/${resetToken}`

const message = getRestPasswordTemplate(user?.name, resetUrl)
try{
await sendEmail({
    email : user.email,
    subject : "shopit reset password token",
    message ,
})

res.json({
    message : `email send to ${user.email}`
})
  //const sendEmail = async(options)=>{ //login krk mailtrap ko test mode me emailtesting  
    //pe gye wahN shopit likha phir os link ko click kiya tw ye code mila osko copy krliya
}catch(error){
    user.resetPasswordToken =undefined
    user.resetPasswordExpire = undefined

    await user.save()

    return next(new ErrorHandler(error.message , 500))
}


})

export const resetPassword =catchAsyncErrors(async (req,res,next)=>{
    //check token is correct or not database ko params se

    //hash url token //user ko plain diya isliye osko hash kiya ta k compare kr sky

    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex")

    const  user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()} //check if expire tw current time se expire tym greater ho tw meAans token is not expire
    })

    if(!user){
        return next( new ErrorHandler("reset token is invalidor expired", 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next( new ErrorHandler("password doesnot match", 400))
    }

    //sett new password

    user.password = req.body.password 

    // not undefine both
    user.resetPasswordToken =undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user , 200 ,res)

    



})


//get current user profile
// api/me

// export const getUserProfile = catchAsyncErrors (async (req,res,next)=>{
 
  

    
//    let user = await User.findById(req?.user?._id)
 
//   res.status(200).json({
//     success: true,
//    user,
//   });

// })


export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    console.log(req.user)
    let user = await User.findById(req?.user?._id);
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    res.status(200).json({
      success: true,
      user,   // Ensure the user object is included in the response
    });
  });
  


//updatepassword //api/password/update

export const updatePassword = catchAsyncErrors (async (req,res,next)=>{
    //.select("+password") part ensures that the password field is included in the query result, as 
    //it might be excluded by default for security reasons.
    const user = await User.findById(req.user._id).select("+password")

    console.log(user)

  //check old password with databAase password

  const isPaswordMatched = await user.comparePassword(req.body.oldPassword)

  console.log(isPaswordMatched , "...")

  if(!isPaswordMatched){
    return next(new ErrorHandler("old password is incorrect" , 400))
  }

  user.password = req.body.password

  user.save()

  res.status(200).json({
    success : true
  })

  


})


export const updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newData = {
        name : req.body.name,
        email : req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user._id ,newData,{ new : true})
    //when id comes form req obj we use _id

    res.status(200).json({
      user
    })


})


export const allUsers = catchAsyncErrors(async (req,res,next)=>{
    const users = await User.find()
    console.log(users)

    res.status(200).json({
        users
    })
})


export const getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const  user = await  User.findById(req.params.id) //when id vcomes from params we use .id

    console.log(user , "here is user")

    if(!user){
        return next(new ErrorHandler(`user not found with ${req.params.id}` , 404))
    }

    res.status(200).json({
        user
    })
})

export const updateUser = catchAsyncErrors(async (req,res,next)=>{
    const newData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id , newData , {new :true})

    res.status(200).json({
        user,
    })
})


export const deleteUser = catchAsyncErrors(async (req,res,next)=>{
    const  user = await  User.findById(req.params.id) //when id vcomes from params we use .id

    console.log(user , "here is user")

    if(!user){
        return next(new ErrorHandler(`user not found with ${req.params.id}` , 404))
    }

   await  user.deleteOne()

    res.status(200).json({
        success : true
    })
})
























