import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
         required: true
    },
    description: {
        type: String,
         required: true
    },
    content: {
        type: String,
         required: true
    },
    url:{
       type:String,
        required:true
    },
    publicId:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
} , {timestamps:true})

const Blog = mongoose.models.Blog || mongoose.model ('Blog' , BlogSchema)

export default Blog ;