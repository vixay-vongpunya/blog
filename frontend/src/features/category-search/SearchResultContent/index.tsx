'use client'
import BlogList from "@/common/BlogList";
import BigBlogCard from "@/components/BigBlogCard";
import BlogCard from "@/components/BlogCard";
import SecondaryBlogCard from "@/components/SecondaryBlogCard";
import SmallBlogCard from "@/components/SmallBlogCard";
import { blogs } from "@/data/blogs";
import RecentBlogCard from "@/features/home/RecentBlogCard";
import { Box, Button, Stack, Typography } from "@mui/material";
import AuthorCardList from "../AuthorCardList";

function SearchResultContent(){
    return(
        <Stack sx={{
            gap:8
        }}>
            <Stack sx={{
                gap: 2
            }}>
                <Typography variant='h4'>Recommended Blogs</Typography>
                <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap:2,
                maxheight: 'fit-content'
                }}>
                <BigBlogCard id={blogs[0].key} title={blogs[0].title} author={blogs[0].author} 
                    content={blogs[0].content} created={blogs[0].created}/>
                <SecondaryBlogCard blogs={blogs}/> 
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