import { Post } from "@/api/post";
import PostCard from "@/components/PostCard";
import { Box, Pagination } from "@mui/material";

function BlogList({posts}:{posts: Post[]}){
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '3em'}}>
            <Box sx={{display: 'grid', gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2,1fr)',
                md:'repeat(3,1fr)'}, gap: '2em'}}>
                {posts?.map((post: Post)=>(
                    <PostCard
                        key={post.id} 
                        id={post.id} 
                        title={post.title} 
                        preview={post.preview} 
                        created={post.created}
                        author={post.author.name}
                        categories={post.categories} />
                ))}
            </Box>
            <Pagination hidePrevButton hideNextButton sx={{alignSelf: 'center', margin:'auto'}} count={10} boundaryCount={10}/>
        </Box>
    )
}

export default BlogList;