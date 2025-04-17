import BlogCard from "@/components/BlogCard";
import { blogs } from "@/data/blogs";
import { Box, Pagination } from "@mui/material";


function BlogList(){
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '3em'}}>
            <Box sx={{display: 'grid', gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2,1fr)',
                md:'repeat(3,1fr)'}, gap: '2em'}}>
            { blogs?.map(({key, title, content, author, created})=>(
                <BlogCard id={key} title={title} content={content} author={author} created={created}/>
            ))}
            </Box>
            <Pagination hidePrevButton hideNextButton sx={{alignSelf: 'center', margin:'auto'}} count={10} boundaryCount={10}/>
        </Box>
        
    )
}

export default BlogList;