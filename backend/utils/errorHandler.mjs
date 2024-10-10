class ErrorHandler extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this , this.constructor) //ye complete tack deta h erorr ka it has 2 parameter this rep ye wala obj or oska constructor
    }
}
export default ErrorHandler