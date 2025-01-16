import { NextResponse } from 'next/server';
import Blog from '../../../models/blog.js'
import connectDB from '../../../database/index.js'

export async function GET(req, { params }) {
    try {
        
        await connectDB();

        const { id } =await params;

    
        const blog = await Blog.findById(id);

        if (blog) {
       
            return NextResponse.json({
                success: true,
                data: blog
            });
        } else {
         
            return NextResponse.json(
                { message: 'Blog not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error(error);
      
        return NextResponse.json(
            { message: 'An error occurred' },
            { status: 500 }
        );
    }
}
