import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


 const userSchema  = new mongoose.Schema({
    name : {
        type : String, 
        required : [true , "please enter your name"],
        maxlength : [50 , "your name cannot exceed 50 characters"]
    }
    ,

   email : {
        type : String, 
        required : [true , "please enter yourEmail"],
        maxLength : [50 , "your name cannot exceed 50 characters"],
        unique : true // uek jesi na ho
    }

    ,
   password : {
        type : String, 
        required : [true , "please enter your password"],
        minLength : [6 , "your password mustbe longer than six characters"],
        select : false //user login kre tw reponse me password na jaye

    },

    avartar : {
        public_id : String ,
        url : String 
    }
    ,

    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'moderator'],
        default: 'user',
      },
    resetPasswordToken : String,
    resetPasswordExpire :Date
 }, {timeStamps: true})


//in mongo dbpre is a method that allow yyour to register midddleware before execution of certain operations
// kch function k excecutions se pehl jesesave se pehly validate ya remove etc

//hmary case me user save hony se pehly se middleware kch cheezt chec krk phir save kre ki user ko

//here we use function word becsue we have to use this keyword

//here wecheck current value same h origginal pas se ya nh

userSchema.pre("save", async function (next){
if(!this.isModified("password")){
    next()
}

this.password =await bcrypt.hash(this.password , 10) //ye pasword ko hash me convert ktrde ga 10 is default value means 10 hash
})

/// function return json token
 //note**** no use of this and send oken now in new login api//
// userSchema.methods.getJwtToken = function (){ //usrshema .method is a property of mongodb that a;owto add function or method to schema
// return jwt.sign({id : this._id},process.env.JWT_SECRET , {
//     expiresIn : process.env.JWT_EXPIRES_TIME
// }) //assign token to user //we pas paylod which is a data we want to save in token
// }                          // phir isko ek naam den g  // option me den g k kb expire hoga token itne time k bad login again


// userSchema.methods.getJwtToken = function() {
//     // return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     //     expiresIn: process.env.JWT_EXPIRES_TIME,
//     // });
//   return  jwt.sign({
//         _id: this._id,
//         email: this.email,
//         iat: Math.floor(Date.now() / 1000) - 30,
//         exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
//     }, process.env.JWT_SECRET);
// };

//check if password enteredis correct or not

userSchema.methods.comparePassword= async function(enteredPasword){
  return  await bcrypt.compare(enteredPasword , this.password) // compare is bcypt function entered pass means jo abhi user ne dala
} //entered pass means user ne jo dala




//generate reset password token

userSchema.methods.getResetPasswordToken = function(){
   // first hum token bna k user ko den g
   //crypto builtin libray h jo data ko protect krti h
   //osk zarye hum ne token bnya or osko string me convert krdiya hexadecimal ki form me this token is readable
   // readable token hum user ko den g or unreadable hum database me safe kren ta k token protect rhy 
    const resetToken = crypto.randomBytes(20).toString('hex') 
    

    //now readable data ko hum hash me convert kren g means unreadble me
    //ressetpassword token property me token ko hash krwaya
    // crpto.createHash(sha256) ye hash ka obj generate kre ga using secure hash algorithm 256 bytes
    // upate will take take data which we want to convert 
    //digest hash me data ko krk hexadecimal me convert kre ga

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    //set token expiry
    this.resetPasswordExpire = Date.now() + 30 * 60 *1000 //set for 3om
    return resetToken
    
    //This line returns the original, unhashed reset token. This token will be sent to the user 
    //(e.g., via email) so that they can use it to reset their password. The hashed token is stored 
    //in the database for security reasons.
}

 export default mongoose.model("user" , userSchema)