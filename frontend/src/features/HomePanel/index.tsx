import { Box, Typography } from "@mui/material";
import { blogs, category } from "@/data/blogs";
import BlogCard from "./BlogCard";

function HomePage(){
    return(
    <div className="mx-auto max-w-7xl">
        <Typography variant="h4" sx={{marginBottom: 4}}>From the blog</Typography>
        <div className="grid grid-cols-3 gap-6">
            {blogs.map(({key, title, content, author, created})=>(
                <BlogCard key={key} title={title} content={content} author={author} created={created}/>
            ))}
        </div>
        <Box sx={{display: "flex", flexDirection:"column",marginY:2 ,  gap:2}}>
            <Typography variant="h4" className="tracking-tight">Popular Categories</Typography>
            <Box sx={{display: "flex", gap:2}}>
            {category.map(({type, number})=>(
                <Box sx={{paddingX:4, paddingY:2,  boxShadow:2, borderRadius: 2}}>
                    <Typography>{type}</Typography>
                </Box>
            ))}
            </Box>
            
        </Box>
        <Box>
        <Typography variant="h4">Recent Posts</Typography>

        </Box>
    </div>
    )
}

export default HomePage;