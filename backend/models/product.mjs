import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please enter produt name"],
        maxLength :[200 , "should not exceed 200 characters"]

    },
    price : {
        type : Number,
        required : [true , "please enter produt price"],
        maxLength :[200 , "should not exceed 5 characters"]

    },
    description : {
        type : String,
        required : [true , "please enter produt description"],


    },
    ratings : {
        type : Number,
      default : 0

    },

    images : [
        {
            public_id : {type : String , required : true},
            url : {type : String , required : true},
        }
    ],

    category :{
        type : String ,

        required : [true , "please enter produt category"],
        enum : {
            values :["laptops" ,"mobile" ,"electronics", "accessories", "home" , "headphones", "food" , "books" , "store" ,"outdoor"],
            required : [true, "please select correct category"]
        }
    },

    seller : {
        type : String ,
        required : [true , "please enter product  seller"]
    }
,
    stock : {
        type : String ,
        required : [true , "please enter product  stock"]
    }
    ,
    numOfReviews : {
        type : Number,
      default : 0

    },
    reviews :[
     {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true
        }
        , 
        rating : {
            type : Number,
            required : true
        },
        comment :{
            type : String ,
            required : true
        }
     }
    ],
    user : { // user knsa h jsne review diya
        type : mongoose.Schema.Types.ObjectId, //unique id provided by mongo
       ref : "user",
       required : true
      
    },


    
 //auto add created on time
   

}   ,{timestamps : true} )


export default mongoose.model("Product" , productSchema)