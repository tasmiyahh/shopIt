
import catchAsyncErrors from "../middlewares/catchAsyncErrors.mjs"
import product from "../models/product.mjs"
import Product from "../models/product.mjs"
import APIFilters from "../utils/apifilters.mjs"
import ErrorHandler from "../utils/errorHandler.mjs"

export const getProducts = async (req,res,next) =>{
//here we initialize query property of apifilter class which create query obj

const resPerPage = 4 // no of iten you want to show on each pg


// // Initialize the APIFilters class with the Product query and request query string
const apiFilters = new APIFilters(Product.find(), req.query); // find krna h is point pe keyword waly word sary product me se find kro
  apiFilters.search().filters(); //then is point pe hum ne query ko modify kya mtlb osko kaha keyword dekho but wo name me dekho or case jo bh ho iski worknig hum ne apifilters me ki h
// so in two steps e make plan how to filter it
//console.log(apiFilters);


console.log(req.user)
console.log("Query after filters applied:", apiFilters.query); // Debugging log
let products = await apiFilters.query; // is point pe plan k according excecute kiya //queryobj //query=product
//ChatGPT

let filterProductsCount =products.length //ye ktne h total pro btaye ga


//in summary, you first set up your query obj, then you add search criteria to it, and finally, you execute the query to get the results.
//un filter product pe pagination lgani h
/////  // Apply pagination to the query =product
apiFilters.pagination(resPerPage)
 // Execute the paginated query
products = await apiFilters.query.clone() //execute query //copy of query obj dobra cal kiyq isliye


// console.log(products);

    res.json({
       resPerPage,
        products,
        filterProductsCount,
    })
}


//create new product /api/admin/products

export const newProduct = catchAsyncErrors(async(req,res,next)=>{
  if (!req.user) {
    return next(new Error('User not authenticated')); //logged in user
  }
  //req.body is the product data.
//req.user is the logged-in user.
//req.user._id is the ID of the logged-in user.
//req.body.user = req.user._id; sets the product's user field to the ID of the logged-in user.

  req.body.user= req.user._id //add user in product ta k jo user admin ho wo product post kr sky //body me jo user aya h oski id means product me jo user field h//first log in then add so basically login waly user ki id

    const product = await Product.create(req.body) //id lgane k bad save krwaya ta k pta chle ks ne pt kiyah
console.log(product , "created")
    res.json({
         product,
    })


})

//single pro
export const getProductDetails = catchAsyncErrors (async (req,res ,next) =>{
   const product = await Product.findById(req.params.id)
 if(!product){
   
   return next(new ErrorHandler('product not found' , 400))
   }
  res.status(200).json({
    product
  })})




export const getProductUpdated =catchAsyncErrors( async (req,res,next) =>{
    const product = await Product.findById(req.params.id)
  if(!product){
   
    return next(new ErrorHandler('product not found' , 400))
   }
   
    let updatePro = await Product.findByIdAndUpdate(req.params.id , req.body , {new : true})
    console.log("get pro")
      res.send({
        message : "get pro",
        data : updatePro
      })
   
})

export const getProductDeleted = catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.findById(req.params.id)
  if(!product){
    
    return next(new ErrorHandler('product not found' , 400))
   
   }
   
    await product.deleteOne()
    console.log("get pro")
      res.send({
        message : "deleted pro",
     
      })
   
})

//review///
/// update product review

export const createPrductReview = catchAsyncErrors(async (req,res, next)=>{
  const {rating , comment , productid} = req.body

  console.log('Request Body:', req.body); // Debugging statement
  console.log('User:', req.user); // Debugging statement

  const reviews = {
    user : req.user.id,
   rating : Number(rating),
   comment : comment




  }

  const product = await Product.findById(productid)
  if(!product){
    return next(new ErrorHandler("no rouct found with this id"))

  }

  console.log('Product Found:', product); // Debugging statement

// Flag to check if the user has already revieweds the product
let isReviewed = false;

// Iterate through the product reviews to find and update the review if it exists product me dekhoagr os id se user ne coment kiya hua h product pe ya nh

for(let i = 0 ; i < product.reviews.length ; i++){
  if(product.reviews[i].user.toString() === req.user._id.toString() ){
    product.reviews[i].comment =  comment,
    product.reviews[i].rating = rating
    isReviewed = true;
    break;
  }
}

// If the user hasn't reviewed the product yet, add the new review

if (!isReviewed) {
  product.reviews.push(reviews);
}
console.log('Updated Reviews:', product.reviews);


// Update the number of reviews

product.numOfReviews = product.reviews.length

//calculate new average of rating
//acumulatd value 
//here curent value is item
//0 is initial value
product.ratings = product.reviews.reduce((acc ,item)=> item.rating + acc , 0 )/ product.reviews.length

await product.save({validateBeforeSave : false}) //save product now

res.status(200).json({
  success : true,
  product 
})


})


//get all product reviews

export const getProductReviews = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.query.id)

  if(!product){
    return next(new ErrorHandler("no product found with this id"))
  }

  res.json({
    reviews : product.reviews
  })
})


//elete product review



export const deleteReview = catchAsyncErrors(async (req,res,next)=>{
  console.log('Request query:', req.query)
  const product = await Product.findById(req.query.productid)
  if(!product){
  return next( new ErrorHandler("no product found with this id"))
  }

  if (!req.query.id) {
    return next(new ErrorHandler("Review ID is required", 400));
  }

  console.log(req.query.id)

 
  product.reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());



  product.numOfReviews = product.reviews.length

  product.ratings = product.reviews.reduce((acc ,item)=>item.rating + acc , 0  )/product.numOfReviews

  await product.save({validateBeforeSave : false})

  res.status(200).json({
    success: true
  })
})


 
