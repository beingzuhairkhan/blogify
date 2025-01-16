import BlogOverView from '../components/BlogOverView.js'



async function fetchListOfBlog(){
    try{
        const URL = process.env.NEXT_PUBLIC_API_URL
        const apiResponse = await fetch(`${URL}/api/get-blogs`,{
            method:'GET',
            cache:'no-store',

        });
        const result = await apiResponse.json();
        // console.log(result?.data);
        return result?.data ;

    }catch(error){

    }
}

const Blogs =async ()=>{
    const blogList = await fetchListOfBlog()
     console.log("Bloglist" , blogList)
    return(
        <div>
            <BlogOverView blogList={blogList}/>
        </div>
    )
}

export default Blogs