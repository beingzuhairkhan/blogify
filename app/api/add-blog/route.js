import { NextResponse } from 'next/server';
import Blog from '../../models/blog.js';
import connectDB from '../../database/index.js';
import Joi from 'joi';
import {v2 as cloudinary} from 'cloudinary'


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
    
})



const addNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
});



export async function POST(req) {
    try {
        await connectDB()
        const formData = await req.formData();  // Extract FormData from the request

        // Get the fields from formData
        const file = formData.get("image"); 
        const title = formData.get("title");
        const description = formData.get("description");
        const content = formData.get("content");

        // Check if the image is provided
        if (!file) {
            return NextResponse.json({
                success: false,
                message: 'No image provided',
            });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder: 'blogs',
            }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            uploadStream.end(buffer);  // End the stream to start uploading
        });
       
        const { url, public_id } = result;  // Extract Cloudinary URL and public_id

        // Validate the input fields
        if (!title || !description || !content) {
            return NextResponse.json({
                success: false,
                message: 'Title, description, and content are required',
            });
        }
        

        // Create new blog entry in the database
        const newlyBlogData = await Blog.create({
            title,
            description,
            content,
            url,  
            publicId: public_id,
        });
      

        return NextResponse.json({
            success: true,
            message: 'Blog added successfully',
            data: newlyBlogData,
        });
    } catch (error) {
        console.error('Error adding blog:', error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong',
        });
    }
}
