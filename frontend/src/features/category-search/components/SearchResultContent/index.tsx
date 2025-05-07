import BigBlogCard from "@/components/BigBlogCard";
import { Box, Button, Stack, Typography } from "@mui/material";
import AuthorCardList from "../AuthorCardList";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import PostList from "@/common/post-list/PostList";
import { Post } from "@/domains/post/types";
import {RoundButton} from "@/components/Button";

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
                <PostList posts={posts.slice(4)}/>
                <RoundButton text='See more recommended posts' onClick={()=>{}}/>
            </Stack> 
            <Stack sx={{ gap:2 }}>
                <Typography variant='h4'>Our authors</Typography>
                <AuthorCardList/>
                <RoundButton text='See more authors' onClick={()=>{}}/>
            </Stack>        
        </Stack>
       
    )
}

export default SearchResultContent;