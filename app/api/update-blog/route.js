import { NextResponse } from 'next/server';
import Blog from '../../models/blog.js';
import connectDB from '../../database/index.js';
import Joi from 'joi';
import mongoose from 'mongoose';

const editBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
});

export async function PUT(req) {
    try {
        await connectDB();

        // Extract the blog ID from search params
        const {searchParams} = new URL(req.url);
        
        const getCurrentBlogId = searchParams.get('id');
      

        // Validate ObjectId
        if (!getCurrentBlogId || !mongoose.Types.ObjectId.isValid(getCurrentBlogId)) {
            return NextResponse.json(
                { success: false, message: 'Invalid blog ID format' },
                { status: 400 }
            );
        }

        // Parse JSON body
        const { title, description, content } = await req.json();
        
        // Validate input using Joi
        const { error } = editBlog.validate({ title, description, content });
        if (error) {
            return NextResponse.json(
                { success: false, message:"error" },
                { status: 400 }
            );
        }

        // Update the blog using correct variable
        const blog = await Blog.findByIdAndUpdate(
            {_id:getCurrentBlogId}, 
            { title, description, content },
            { new: true }
        );

        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Blog updated successfully', data: blog },
            { status: 200 }
        );

    } catch (error) {
        console.error('Update blog internal server error:', error);
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
