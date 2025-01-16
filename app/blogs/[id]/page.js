'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import MarqueeDemo from '../../components/Marque';
import { Cover } from '@/components/ui/cover';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BlogDetails = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    description: '',
    content: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (params?.id) {
      const fetchBlogDetails = async () => {
        try {
          const response = await fetch(`/api/getById/${params.id}`, {
            method: 'GET',
            cache: 'no-store',
          });
          const data = await response.json();
          if (response.ok) {
            setBlog(data.data);
            setBlogFormData({
              title: data.data.title,
              description: data.data.description,
              content: data.data.content,
            });
          } else {
            setError(data.message || 'Blog not found');
          }
        } catch (error) {
          setError('An error occurred while fetching the blog.');
        }
      };
      fetchBlogDetails();
    }
  }, [params?.id]);

  const handleDeleteById = async (blogId) => {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${blogId}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) {
        toast.success("Blog deleted successfully!");
        router.push('/blogs');
      } else {
        toast.error("Failed to delete blog!");
      }
    } catch (error) {
      toast.error('An error occurred while deleting the blog.');
    }
  };

  const handleSaveBlogData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/update-blog?id=${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogFormData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Blog updated successfully!');
        setOpenBlogDialog(false);
        setBlog({ ...blog, ...blogFormData }); 
      } else {
        toast.error(result.message || 'Failed to update blog.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the blog.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-gray-500 animate-pulse">Loading blog details...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between">
        <Link href="/blogs">
          <h1 className="text-xl ml-6 md:text-2xl lg:text-3xl font-medium max-w-7xl mx-auto text-center relative z-20 py-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 via-neutral-300 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-400">
            <Cover>Blogify</Cover>
          </h1>
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 bg-white shadow-lg rounded-lg overflow-hidden mt-5">
        {/* Image Section */}
        <div className="lg:col-span-2 lg:row-span-2 relative h-96">
          <Image
            src={blog?.url}
            alt={blog?.title || 'Blog Image'}
            fill
            className="object-cover rounded-t-lg lg:rounded-none lg:rounded-l-lg"
          />
        </div>

        {/* Blog Title Section */}
        <div className="lg:col-span-2 p-6">
          <h1 className="text-4xl font-bold text-gray-800 mt-4">{blog.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mt-8">{blog.description}</p>
          <Button
            onClick={() => setOpenBlogDialog(true)}
            className="text-xs mt-5 gap-4"
          >
            Edit
          </Button>

          <Button
            onClick={() => handleDeleteById(blog._id)}
            variant="destructive"
            className="ml-3 text-xs mt-5"
          >
            Delete
          </Button>
        </div>

        {/* Blog Content Section */}
        <div className="lg:col-span-4 p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Content</h2>
            <p className="text-gray-700 leading-relaxed">{blog.content}</p>
          </div>

          {/* Blog Metadata */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <strong>Created At:</strong> {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated At:</strong> {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Blog Dialog */}
      <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Blog</DialogTitle>
            <DialogDescription>
              Update the details for your blog. Click save to confirm changes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input
                id="description"
                placeholder="Enter blog description"
                value={blogFormData.description}
                onChange={(e) => setBlogFormData({ ...blogFormData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter blog content"
                value={blogFormData.content}
                onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSaveBlogData} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MarqueeDemo />
      <Footer />
    </div>
  );
};

export default BlogDetails;
