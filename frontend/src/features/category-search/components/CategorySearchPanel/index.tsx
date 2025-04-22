'use client'
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import SearchResultContent from "../SearchResultContent";
import { usePostsQuery } from "@/features/home/hooks/query";
import { Suspense } from "react";


function CategorySearchPanel({slug}:{slug: string}){
    const {data: blogs, isLoading} = usePostsQuery()
    console.log(slug)
    return(
        <Stack
            sx={{
                mx: "auto",
                maxWidth:"lg",
                padding: '4em',
                gap:8
            }}>
            <Stack sx={{
                margin: 'auto',
                alignItems: 'center',
                gap:2
            }}>
                <Typography variant='h2' textAlign='center'>{slug}</Typography>
                <Typography variant='body1' color='text.secondary'>44k followers &middot; 1.1k following</Typography>
                    <Button variant='contained' sx={{
                        padding: '0.5em 1em', 
                        borderRadius: '99em', 
                        width: 'fit-content',
                        justifySelf: 'center'}}>Follow</Button>     
            </Stack>
            
              {!isLoading &&  <SearchResultContent blogs={blogs}/>}               
        </Stack>
    )
}

export default CategorySearchPanel;