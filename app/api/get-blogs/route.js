import {NextResponse} from 'next/server'
import Blog from '../../models/blog.js'
import connectDB from '../../database/index.js'

export async function GET(req){
    try{
        await connectDB()
        const allBlogs = await Blog.find({})
        if(allBlogs){
            return NextResponse.json({
                success: true,
                data: allBlogs
            })
        }else{
            return NextResponse.status(404).json({message: 'No blogs found'})
        }

    }catch(error){
        console.error(error)
        return NextResponse.status(500).json({message: 'An error occurred'})
    }
}