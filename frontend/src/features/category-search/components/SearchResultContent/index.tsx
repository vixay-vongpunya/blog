
import BlogList from "@/common/BlogList";
import BigBlogCard from "@/components/BigBlogCard";
import HorizontalBlogCard from "@/components/HorizontalBlogCard";
import { Box, Button, Stack, Typography } from "@mui/material";
import AuthorCardList from "../AuthorCardList";
import { Post } from "@/api/post";

function SearchResultContent({posts} : {posts: Post[]}){
    return(
        <Stack sx={{ gap:8 }}>
            <Stack sx={{ gap: 2 }}>
                <Typography variant='h4'>Recommended Posts</Typography>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '4fr 5fr',
                    gap:2,
                    maxheight: 'fit-content'
                    }}>
                    <BigBlogCard 
                        key={posts[0].id} 
                        id={posts[0].id} 
                        title={posts[0].title} 
                        preview={posts[0].preview} 
                        created={posts[0].created}
                        author={posts[0].author.name}
                        categories={posts[0].categories}/>

                    <Box sx={{
                        display:"flex", 
                        flexDirection:"column", 
                        gap:2}}>
                        {posts?.slice(0,3).map((post:any)=>(
                        <HorizontalBlogCard 
                            key={post._id} 
                            id={post._id} 
                            title={post.title} 
                            preview={post.preview} 
                            created={post.created}
                            author={post.author.name}
                            categories={post.categories}/> 
                    ))}
                    </Box>
                </Box>
            </Stack>
            
            <Stack sx={{ gap:2 }}>
                <Typography variant='h4'>All stories posts</Typography>
                <BlogList posts={posts}/>
            </Stack> 
            <Stack sx={{ gap:2 }}>
                <Typography variant='h4'>Our authors</Typography>
                <AuthorCardList/>
                <Button variant='outlined' 
                sx={{
                    padding: '0.3em 0.6em', 
                    borderRadius: '99em', 
                    width: 'fit-content',
                    }}>See more</Button> 
            </Stack>        
        </Stack>
       
    )
}

export default SearchResultContent;