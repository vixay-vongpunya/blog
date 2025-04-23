import { Post } from "@/api/post";
import BlogCard from "@/components/BlogCard";
import { Box, Pagination } from "@mui/material";


function BlogList({posts}:{posts: Post[]}){
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '3em'}}>
            <Box sx={{display: 'grid', gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2,1fr)',
                md:'repeat(3,1fr)'}, gap: '2em'}}>
            {posts.map(({ _id, title, content, author, created}:any)=>(
                <BlogCard id={_id} title={title} content={content} author={author.name} created={created}/>
            ))}
            </Box>
            <Pagination hidePrevButton hideNextButton sx={{alignSelf: 'center', margin:'auto'}} count={10} boundaryCount={10}/>
        </Box>
    )
}

export default BlogList;