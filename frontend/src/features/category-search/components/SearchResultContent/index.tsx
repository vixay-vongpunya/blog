
import BlogList from "@/common/BlogList";
import BigBlogCard from "@/components/BigBlogCard";
import HorizontalBlogCard from "@/components/HorizontalBlogCard";
import { Box, Button, Stack, Typography } from "@mui/material";
import AuthorCardList from "../AuthorCardList";
import { Blog } from "@/data/post";

function SearchResultContent({blogs}:{blogs:Blog[]}){
    console.log("aha", blogs)
    return(
        <Stack sx={{ gap:8 }}>
            <Stack sx={{ gap: 2 }}>
                <Typography variant='h4'>Recommended Blogs</Typography>
                <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap:2,
                maxheight: 'fit-content'
                }}>
                <BigBlogCard item={blogs[0]}/>
                <Box sx={{
                    display:"flex", 
                    flexDirection:"column", 
                    gap:4,
                    paddingRight: '5em'}}>
                    {blogs?.slice(0,3).map((item:any)=>(
                    <HorizontalBlogCard item={item} limit={0}/> 
                ))}
            </Box>
                </Box>
            </Stack>
            
            <Stack sx={{
                gap:2
            }}>
                <Typography variant='h4'>All stories posts</Typography>
                <BlogList/>
            </Stack> 
            <Stack sx={{
                gap:2
            }}>
                <Typography variant='h4'>Our authors</Typography>
                <AuthorCardList/>
                <Button variant='outlined' sx={{
                    padding: '0.3em 0.6em', 
                    borderRadius: '99em', 
                    width: 'fit-content',
                    }}>See more</Button> 
            </Stack>        
        </Stack>
       
    )
}

export default SearchResultContent;