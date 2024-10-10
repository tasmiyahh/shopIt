//check if user is authenticated or not

import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.mjs";
import catchAsyncErrors from "./catchAsyncErrors.mjs";
import User from "../models/user.mjs";


//kch routes wo he user acess kr skty jo authentic ho 

// export const isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
//     const token= req.cookies.token //we import cookie in servermjs
   

//     console.log("Cookies: ", req.cookies); // Debug: Print cookies
//     console.log("Token: ", token); // Debug: Print token
//         if(!token){
//         return next(new ErrorHandler("login first to access this resource" , 401)) //token h tw checck k expie tw nh


//         }

//  const decoded = jwt.verify(token , process.env.JWT_SECRET)
// // The token is verified using the secret key stored in process.env.JWT_SECRET. 
// //This step decodes the token and extracts the payload, which typically includes the user's ID.

//  console.log(decoded)

// req.user =await User.findById(decoded.id) //bs d bhjni h user me 

// //The user’s ID is extracted from the decoded token, and the user’s details are retrieved from 
// //the database using this ID. The user’s information is then attached to req.user.
 
//  // Attach the decoded user information to the request object
//  // attaches the user's information (including their role) to req.user.



//  next();

 
    

// })


 export const isAuthenticatedUser = async (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  console.log(token , "token")

  if(!token){
             return next(new ErrorHandler("login first to access this resource" , 401)) //token h tw checck k expie tw nh
    
    
            }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    console.log(decoded , "decoded")
    // Verify the token
    req.user = await User.findById(decoded.id);  // Attach the user to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token, please log in again" });
  }
};









 //authorize roles

// export const authorizeRoles=(...role)=>{
// return (req,res, next)=>{
//     if(!role.includes(req.user.role)){
//         return next(new ErrorHandler(`role  ${req.user.role} is not allowed to access this resource` , 403)) 
//     }

//     next()
// }



// }


export const authorizeRoles = (...roles) => {  //here roles come from auth k function k under ka parameter
    return (req, res, next) => {
      // Debugging statement
      console.log('req.user:', req.user.role);
  
      // Check if req.user and req.user.role exist
      if (!req.user.role) {
        return next(new ErrorHandler('User is not authenticated or role is not defined', 401));
      }
  
      // Check if the user's role is included in the allowed roles
      if (!roles.includes(req.user.role)) {
        return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403));
      }
  
      // If the role is authorized, proceed to the next middleware
      next();
    };
  };