import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import productRoutes from "./routes/products.mjs"
import orderRoutes from "./routes/order.mjs"
import { connectDatabase} from './dbconnect.mjs'
import errorMiddlerwares from "./middlewares/errors.mjs"
import authRoutes from "./routes/auth.mjs"
import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json());
app.use(cookieParser());
// handle uncaught exceptions 

process.on(("uncaughtException"), (err)=>{
console.log(`error : ${err}`)
console.log("shutting down due to uncaught exception")
process.exit(1)
})


dotenv.config(); 
connectDatabase()
const port = process.env.PORT; 
app.use(cors({
  origin: 'http://localhost:3000', // Specify your frontend's origin
  credentials: true,// Allow credentials (cookies, authorization headers, etc.)
}));





app.use("/api" ,productRoutes)
app.use("/api" ,authRoutes)  //route pg pe route bna k yahan import kiya ir bola api k bad karoute authRoutes se dekhy
app.use("/api" ,orderRoutes)
//console.log(hello) //eg f uncaught exception

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//error middlewares

app.use(errorMiddlerwares)


const server =app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//handled unhandled promiserejecton 
process.on("unhandledRejection" , (err)=>{
  console.log("error" +":" +err)
  console.log("shutting down server due to unhandled promise rejection")
  server.close(()=>{
    process.exit(1)
  })
})