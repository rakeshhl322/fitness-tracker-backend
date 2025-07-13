import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectdb = async () => {
    console.log('inside')
    try {
        console.log(`${process.env.URI}`)
        await mongoose.connect(`${process.env.URI}`)
        console.log('connected to db')
    } catch (error) {
        console.log(error,'error')
    }
}

export default connectdb;