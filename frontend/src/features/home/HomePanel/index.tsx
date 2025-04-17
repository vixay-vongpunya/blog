"use client"

import { Box, Card, Pagination, Stack, Typography } from "@mui/material";
import { blogs, category } from "@/data/blogs";
import RecentPostCard from "../RecentBlogCard";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePostsQuery } from "../hooks/query";
import SmallBlogCard from "@/components/SmallBlogCard";
import MoreButton from "@/components/MoreButton";
import BlogList from "@/common/BlogList";

function HomePage(){
    const { data:blogs } = usePostsQuery()
    
    return(
        // want a smaller than lg and bigger than md so i added padding
    <Box sx={{
        mx: "auto",
        maxWidth:"lg",
        display: "flex",
        flexDirection: "column",
        padding: '4em',
        gap:4}}>
        <Box>
            <SectionTitle title="Categories"/>
            <Box sx={{display: "flex", gap:2, marginLeft: '1em'}}>
                {category.map(({type, number})=>(
                    <Card key={type} sx={{
                        padding: '0.5em 1em',  
                        boxShadow:2, 
                        borderRadius: '0.5em',
                        cursor: 'pointer'}}>
                        <Typography>{type}</Typography>
                    </Card>
                ))}
            </Box>
        </Box>   
        <Box>
            <SectionTitle title="From the Blogs"/>
            <BlogList/>
        </Box>
        <Box sx={{display: "flex", flexDirection:"column"}}>
            <SectionTitle title="Popular Categories"/>
            <Box sx={{display: "flex", gap:2, marginLeft: '1em'}}>
                {category.map(({type, number})=>(
                        <Card key={type} sx={{
                            padding: '0.5em 1em',  
                            boxShadow:2, 
                            borderRadius: '0.5em',
                            cursor: 'pointer'}}>
                            <Typography>{type}</Typography>
                        </Card>
                    ))}
            </Box>
            
        </Box>
        <Box>
        <Box sx={{
            mx: "auto",
            maxWidth: "lg",
            display: "grid",
            gridTemplateColumns: "5fr 2fr",
            gap: 4,
            }}>  
            <Box sx={{ flex:1}}>
                <SectionTitle title="Recent Posts"/>
                <RecentPostCard blogs={blogs}/>
            </Box>
            <Box>
                <Box sx={{
                    paddingLeft: '2em',
                    position: "sticky",
                    top:72,
                    borderLeft: "1px solid #ccc",
                }} >
                    <Box >
                        <Typography> What's hot</Typography>
                        <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}> Most Popular</Typography>
                        <Stack sx={{gap: '1.5em'}}>
                            {blogs?.slice(0,3).map(({key, title, content, author, created}, index)=>(
                                    <SmallBlogCard id={key} title={title} content={content} author={author} created={created}/>
                                ))}
                        </Stack>
                        <MoreButton/>
                            
                    </Box>
                    <Box sx={{marginTop: 4}} >
                        <Typography>Choosen By The Editors</Typography>
                        <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                        <Stack sx={{gap: '1.5em'}}>
                            {blogs?.slice(0,3).map(({key, title, content, author, created}, index)=>(
                                    <SmallBlogCard id={key} title={title} content={content} author={author} created={created}/>
                                ))}
                        </Stack>
                        <MoreButton/>
                    </Box>
            </Box>
            
            </Box>
        </Box>
        </Box>
        
    </Box>
    )
}

export default HomePage;