
import Order from "../models/order.mjs"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.mjs" // yahan function bnaya or isko export kiya route pe or route ko export kiye server.mjs pe
import ErrorHandler from "../utils/errorHandler.mjs"
import mongoose from "mongoose"
import Product from "../models/product.mjs"


export const newOrder = catchAsyncErrors(async(req,res,next)=>{ //only dor cod orders
    console.log('req.user:', req.user);
    
    const
     {orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo


    } = req.body

    console.log('req.body:', req.body);

   


    const order =await Order.create({
       
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user : req.user._id

    })

    res.status(200).json({
        order
    })
})
 //single ordr details
export const getOrderDetails = catchAsyncErrors(async(req,res,next)=>{
const order = await Order.findById(req.params.id)

if(!order){
    return next (new ErrorHandler("no order found withh this id" , 404))

}

res.status(200).json({
    order
})
})


//current user order

// export const myOrders = catchAsyncErrors(async (req,res,next)=>{
//     const orders = await Order.find({user : req.user._id})
//          console.log(req.user._id)
//     res.json({
//         orders
//     })
// })



//login waly k sary rders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.user._id;
        console.log('User ID:', userId);

        // Ensure user ID is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }

        const orders = await Order.find({ user: userId });
        console.log('Orders:', orders);

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'No orders found for this user'
            });
        }

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        next(error); // Ensure this is handled by catchAsyncErrors
    }
});


//get admin orders
export const allOrders = catchAsyncErrors(async(req,res,next)=>{
    const Orders = await Order.find()
    console.log(req.user._id);
    console.log(Orders);
  res.status(200).json({
    Orders
  })
})


//update stock and order status


// export const updateOrder = catchAsyncErrors(async(req,res,next)=>{
//     const order = await Order.findById(req.params.id)
//     console.log(order , "orderid")
//     if(!order){
//         return next(new ErrorHandler("no order found with this id"  ,404)
//     )}

//     if(order?.orderStatus === "Delivered"){
//         return next( new ErrorHandler("you already delivered it",400))
//     }

// //order ki hr item dekhy ga product dhondny kliye 
//     order?.orderItems.forEach(async (item)=>{
//         //item k under jo product h product basically product id h objectId("12345") osko striing me convert kren g ta k quet k sky inshort convert kre ga ("1234") remove krde g objid word ko
// const product = await Product.findById(item?.product?.toString())
// console.log(product , "productid")

// if(!product){
//     return next(new ErrorHandler("no product found with this id"))
// }

// product.stock =  product.stock - item.quantity // ab jo poduct mila os me stock field ko update kiya stock me se orddered item quantity - krk
// await product.save()
//     })

//     order.orderStatus = req.body.status
//     order.deliveredAt = Date.now()


//     res.status(200).json({
//         sucess : true,
//         order
//     })
    
// })

export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    console.log(order, "orderid");

    if (!order) {
        return next(new ErrorHandler("No order found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You already delivered it", 400));
    }

    for (const item of order.orderItems) {
        console.log(item, "order item");
        const productId = item.product ? item.product.toString() : undefined;
        console.log(productId, "productIdddd");

        if (!productId) {
            return next(new ErrorHandler("Product ID is missing", 400));
        }

        const product = await Product.findById(productId);
        console.log(product, "productid");

        if (!product) {
            return next(new ErrorHandler("No product found with this ID", 404));
        }

        product.stock = product.stock - item.quantity;
        await product.save();
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
        success: true,
        order,
    });
});

//delete order

export const deleteOrder = catchAsyncErrors(async (req,res,next)=>{
    const order  =await Order.findByIdAndDelete(req.params.id)

if(!order){
    return next(new ErrorHandler("no order found with this id"))
}

    res.json({
        succes : true,
        order
    })

})



