import mongoose from "mongoose";

const Connection=()=>{
    const DB_URL="mongodb+srv://anuragkomrewar1:ngUsYNlBlIkOmv7B@blogapp.kh0w3ek.mongodb.net/";

        mongoose.connect(DB_URL,{useNewUrlParser:true});
        mongoose.connection.on('connected',()=>{
            console.log('Database connected successfully!');
        });
        mongoose.connection.on('disconnected',()=>{
            console.log('disconnected');
        });
        mongoose.connection.on('error',(error)=>{
            console.log('error while connecting',error.message);
        });

}
export default Connection;