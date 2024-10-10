import ErrorHandler from "../utils/errorHandler.mjs"

export default(err,req ,res ,next)=>{
let error ={
    statusCode : err?.statusCode || 500,
    message : err?.message || "internal server error"
}


//handle mongoose duplicate error
if(err.code === 11000 ){
    const message = `duplicate ${Object.keys(err.keyValue)} entered`
    error = new ErrorHandler(message, 400)
    
}


//handle wrong jwt error
if(err.name === "JsonWebTokenError"){
    const message = `json web token is invalid try again`
    error = new ErrorHandler(message, 400)

}

//jwt handle expired eror
if(err.name ==="TokenExpiredError"){
    const message = `json web token is expired try again`
    error = new ErrorHandler(message, 400)   
}
res.status(error.statusCode).json({
    message : error.message
})
}

