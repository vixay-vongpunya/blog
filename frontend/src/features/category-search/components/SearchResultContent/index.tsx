import BigBlogCard from "@/components/BigBlogCard";
import { Box, Button, Stack, Typography } from "@mui/material";
import AuthorCardList from "../AuthorCardList";
import { Post } from "@/api/post";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import PostList from "@/common/post-list/PostList";

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
                    <BigBlogCard 
                        key={posts[0].id} 
                        id={posts[0].id} 
                        title={posts[0].title} 
                        preview={posts[0].preview} 
                        created={posts[0].created}
                        author={{id: posts[0].author.id, name: posts[0].author.name}}
                        categories={posts[0].categories}/>

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