'use client';

import AddNewBlog from './AddNewBlog';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { MagicCard } from "../../components/ui/magic-card";
import Footer from './Footer'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
const BlogOverView = ({ blogList }) => {
  const { theme } = useTheme();

  const router = useRouter()

  useEffect(()=>{
    router.refresh();
  },[])

  return (
    <div className="min-h-screen flex flex-col gap-10 p-6">
      <AddNewBlog />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogList && blogList.length > 0 ? (
          blogList.map((blog, index) => (
            <MagicCard
              key={index}
              className="cursor-pointer flex flex-col items-center justify-center text-center shadow-md p-4"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <Link href={`/blogs/${blog._id}`} passHref>
                <div>
                  <Image
                    src={blog?.url}
                    alt={blog?.title || 'Blog Image'}
                    width={300}
                    height={250}
                    className="w-[300px] h-[250px] object-cover rounded-md mx-auto"
                  />
                  <h2 className="text-lg font-semibold mt-4">{blog.title}</h2>
                  <p className="text-sm text-gray-500 mt-2">{blog.description}</p>
                </div>
              </Link>
            </MagicCard>
          ))
        ) : (
          <center>

<p className="text-gray-500 flex justify-center items-center text-center text-2xl mt-10">No blogs available.</p>
          </center>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default BlogOverView;
