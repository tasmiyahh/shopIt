import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    shippingInfo: {
        address : {
        type: String,
        required: true}

    ,
    city: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
  
       
    },

    orderItems: [
        {
            name: {
                type: String,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            }

        }
    ],
    paymentMethod : {
        type : String,
        required : [true, "please select payment mehod"],
        enum :{
            values : ["COD" ,"card"],
            message : "please select cod or card"
        }
    },

    paymentInfo:{
       id : String,
       status : String 
    },

    itemsPrice: {
        type : Number ,
        required : true
    },
    taxAmount: {
        type : Number ,
        required : true
    },
    shippingAmount: {
        type : Number ,
        required : true
    },
    totalAmount: {
        type : Number ,
        required : true
    },
    orderStatus: {
        type : String ,
        enum :{
            values : ["processing" , "shipped" , "delivered"],
            message : "please select correct ordder status"
        },
        default : "processing"
    },
    deliveredAt :Date

    

}, {timestamps : true})

export default mongoose.model("order" , orderSchema)