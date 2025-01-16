import { NextResponse } from 'next/server';
import Blog from '../../models/blog.js';
import connectDB from '../../database/index.js';

export async function DELETE(req) {
    try {
        await connectDB()
        const {searchParams} = new URL(req.url);
        console.log("req url" ,req.url )
        const getCurrentBlogId = searchParams.get('id');
        if(!getCurrentBlogId){
            return NextResponse.json({
                success: false,
                message: 'Something went wrong',
            }); 
        }
        const deleteCurrentBlogId = await Blog.findByIdAndDelete(getCurrentBlogId)
        if(deleteCurrentBlogId){
            return NextResponse.json({
                success: true,
                message: 'Blog deleted Successfully',
            });
        }else{
            return NextResponse.json({
                success: false,
                message: 'Blog not found',
            });  
        }

        

    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong',
        });
    }
}