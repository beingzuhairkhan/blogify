import mongoose from 'mongoose'

const connectDB = async () => {
    const connectionUrl = process.env.MONGO_URI
    mongoose.connect(connectionUrl).then(() => console.log('Database connection successful')).catch((error)=>{
        console.log("Failed to connect Database")
    })
}

export default connectDB;