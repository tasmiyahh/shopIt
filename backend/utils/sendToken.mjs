import user from "../models/user.mjs"
// export default (user , statusCode , res)=>{
//     //create jwt token

//     const Token = user.getJwtToken(); // Method to generate token
//    console.log(Token , "t")
//     //option for cookie
//     const options = {
//         expires : new Date (Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000) ,//24 h , 60m ,60s ,1000ms
//         httpOnly : true //cookie cant be acccess from front end it can only be access from backend
//     }
//     // res.status(statusCode).cookie("Token" , Token , options).json({ //name , payload , option
//     //     Token ,
//     //      user
//     // })
//     res.status(statusCode)
//     .cookie("Token", Token, options)
//     .json({
//         Token,
//         user
//     });
        
    
// }

// Helper function to set the cookie and send response
export default(user, statusCode, res) => {
  // Create the JWT token
  const token = user.getJwtToken(); // Ensure you have a method in your User model to generate the token
  
  // Options for the cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000), // Cookie expires in given time
    httpOnly: true, // Cookie cannot be accessed via JavaScript in the frontend
    path: '/', // Ensure cookie is available across all routes
  };
  
  // Send the token in a cookie and in the response JSON
  res.status(statusCode)
    .cookie('token', token, options) // Set the cookie with token
    .json({
      success: true,
      token, // Send the token in the response
      profile: {
        name: user.name,
        email: user.email,
        _id: user._id,
      }, // Send the user data in the response
    });
  
  console.log('Cookie Set:', token); // Debugging line
};

  

