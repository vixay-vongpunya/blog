import BigBlogCard from "@/components/BigBlogCard";
import { Box, Button, Stack, Typography } from "@mui/material";
import AuthorCardList from "../AuthorCardList";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import PostList from "@/common/post-list/PostList";
import { Post } from "@/domains/post/types";

function SearchResultContent({posts} : {posts: Post[]}){
    return(
        <Stack sx={{ gap:8 }}>
            <Stack sx={{ gap: 2 }}>
                <Typography variant='h4'>Recommended Posts</Typography>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '4fr 5fr',
                    gap:4,
                    maxheight: 'fit-content'
                    }}>
                    <BigBlogCard key={posts[0].id} post={posts[0]} />

                    <HorizontalPostList posts={posts.slice(1,4)}/>
                </Box>
            </Stack>
            
            <Stack sx={{ gap:2 }}>
                <Typography variant='h4'>All stories posts</Typography>
                <PostList posts={posts.slice(4)}/>
            </Stack> 
            <Stack sx={{ gap:2 }}>
                <Typography variant='h4'>Our authors</Typography>
                <AuthorCardList/>
                <Button variant='outlined' 
                    sx={{ padding: '0.3em 0.6em', borderRadius: '99em', width: 'fit-content'}}>
                        See more</Button> 
            </Stack>        
        </Stack>
       
    )
}

export default SearchResultContent;