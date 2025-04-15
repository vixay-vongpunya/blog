"use client"

import { Box, Typography } from "@mui/material";
import { blogs, category } from "@/data/blogs";
import BlogCard from "../../components/BlogCard";
import RecentPostCard from "./RecentPostCard";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePostsQuery } from "./hooks/query";

function HomePage(){
    const { data:blogs } = usePostsQuery()
    
    return(
    <Box sx={{
        mx: "auto",
        maxWidth:"lg",
        display: "flex",
        flexDirection: "column",
        gap:4}}>
        <Box>
            <SectionTitle title="Categories"/>
            <Box sx={{display: "flex", gap:2}}>
                {category.map(({type, number})=>(
                    <Box key={type} sx={{paddingX:4, paddingY:2,  boxShadow:2, borderRadius: 2}}>
                        <Typography>{type}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>   
        <Box>
            <SectionTitle title="From the Blogs"/>
            <Box className="grid grid-cols-3 gap-6">
                { blogs?.map(({key, title, content, author, created})=>(
                    <BlogCard id={key} title={title} content={content} author={author} created={created}/>
                ))}
            </Box>
        </Box>
        <Box sx={{display: "flex", flexDirection:"column"}}>
            <SectionTitle title="Popular Categories"/>
            <Box sx={{display: "flex", gap:2}}>
            {category.map(({type, number})=>(
                <Box key={type} sx={{paddingX:4, paddingY:2,  boxShadow:2, borderRadius: 2}}>
                    <Typography>{type}</Typography>
                </Box>
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
            <Box  sx={{ flex:1}}>
                <SectionTitle title="Recent Posts"/>
                <RecentPostCard blogs={blogs}/>
            </Box>
            
            <Box>
                <Box sx={{
                    paddingLeft: 10,
                    position: "sticky",
                    top:72,
                    borderLeft: "1px solid #ccc",
                }} >
                    <Box >
                        <Typography> What's hot</Typography>
                        <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}> Most Popular</Typography>
                        {blogs?.map(({key, title, content, author, created}, index)=>(
                            <Box key={index} sx={{marginTop:3}}>
                                <Typography>{title}</Typography>    
                                <Typography>{author} . {created}</Typography>                               
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{marginTop: 4}} >
                        <Typography>Choosen By The Editors</Typography>
                        <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                        <Box sx={{display: "flex", gap:2}}>
                            {category.map(({type, number})=>(
                                <Box key={type} sx={{paddingX:4, paddingY:2,  boxShadow:2, borderRadius: 2}}>
                                    <Typography>{type}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                
                
            </Box>
            
            </Box>
        </Box>
        </Box>
        
    </Box>
    )
}

export default HomePage;