import mongoose from 'mongoose'


export const connectDatabase =()=>{

    let DB_URI =process.env.DB_URI

    
    mongoose.connect(DB_URI);

    ////////////////mongodb connected disconnected events///////////////////////////////////////////////
    mongoose.connection.on('connected', function () {//connected
      console.log("Mongoose is connected");
    });

  
}
