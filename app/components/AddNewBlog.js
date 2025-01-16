'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Cover } from '../../components/ui/cover'
import Link from "next/link";
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
const initialFormData = {
  title: "",
  description: "",
  image: null,
  content: "",
};

const AddNewBlog = () => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialFormData);
  
  const router = useRouter()
  // Handles saving the blog data
  const handleSaveBlogData = async () => {
    const URL = process.env.NEXT_PUBLIC_API_URL
    setLoading(true);
    try {
      const formData = new FormData();

      // Ensure that the image is not null or undefined
      if (blogFormData.image) {
        // console.log("File name:", blogFormData.image.name); // Log the file name
        formData.append('image', blogFormData.image);
      } else {
        console.error('No image selected');
      }

      formData.append('title', blogFormData.title);
      formData.append('description', blogFormData.description);
      formData.append('content', blogFormData.content);

      // Log FormData entries to ensure it's properly populated
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);  // Log fields
      // }

      const response = await fetch(`${URL}/api/add-blog`, {
        method: "POST",
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(formData),
        body: formData
      });

      // const result = await response.json();
      //  console.log("result", result);

      if (response.ok) {
     
        toast.success("Blog added successfully!");
        setBlogFormData(initialFormData);
        setOpenBlogDialog(false);
         router.refresh()

      } else {
        toast.error(result.message || "Failed to add blog.");
      }
    } catch (error) {

      toast.error("An error occurred while adding the blog.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    router.refresh();
  },[])

 
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-gray-100">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  //     </div>
  //   );
  // }
  
 



  return (
    <div className="">
      <div className="flex justify-between " >
        <Link href="/">
          <h1 className="text-xl ml-6  md:text-2xl lg:text-3xl font-medium max-w-7xl mx-auto text-center  relative z-20 py-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 via-neutral-300 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-400">
            <Cover>  Blogify  </Cover>
          </h1>
        </Link>
        <div className="mt-5 mr-6" >  <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button></div>
      </div>
      {/* Blog Dialog */}
      <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
            <DialogDescription>
              Fill out the details for your new blog. Click save to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Title Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(e) =>
                  setBlogFormData({ ...blogFormData, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            {/* Description Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter blog description"
                value={blogFormData.description}
                onChange={(e) =>
                  setBlogFormData({ ...blogFormData, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            {/* Image Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div className="col-span-3">
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="border rounded p-2 w-full"
                  accept="image/*"
                  onChange={(e) =>
                    setBlogFormData({ ...blogFormData, image: e.target.files[0] })
                  }
                />
              </div>
            </div>

            {/* Content Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Enter blog content"
                value={blogFormData.content}
                onChange={(e) =>
                  setBlogFormData({ ...blogFormData, content: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>

          {/* Dialog Footer */}
          <DialogFooter>
            <Button
              type="button"
              onClick={handleSaveBlogData}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

  );
};

export default AddNewBlog;
