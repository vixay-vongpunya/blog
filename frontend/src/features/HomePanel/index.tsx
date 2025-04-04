"use client"

import { Box, Typography } from "@mui/material";
import { blogs, category } from "@/data/blogs";
import BlogCard from "../../components/BlogCard";
import RecentPostCard from "./RecentPostCard";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useRef, useState } from "react";

function HomePage(){
    const [isFixed, setIsFixed] = useState(false);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current || !contentRef.current) return;
      
      const sidebar = sidebarRef.current as HTMLElement;
      const content = contentRef.current as HTMLElement;
      
      const contentBottom = content.getBoundingClientRect().bottom;
      const sidebarBottom = sidebar.getBoundingClientRect().bottom;
      
      if (sidebarBottom <= window.innerHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
                {blogs.map(({key, title, content, author, created})=>(
                    <BlogCard key={key} title={title} content={content} author={author} created={created}/>
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
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "5fr 3fr",
            gap: 10
            }}>
            <Box sx={{flexGrow: 1}} ref={contentRef}>
                <SectionTitle title="Recent Posts"/>
                <RecentPostCard blogs={blogs}/>
            </Box>
            <Box >
                <Box ref={sidebarRef}  sx={{
                    minHeight: "150vh",
                    position: "sticky",
                    right: 0,
                    overflow: "hidden",
                    top: 72,
                    }}>
                    <Box >
                        <Typography> What's hot</Typography>
                        <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}> Most Popular</Typography>
                        {blogs.map(({key, title, content, author, created})=>(
                            <Box key={key} sx={{marginTop:3}}>
                                <Typography>{title}</Typography>    
                                <Typography>{author} . {created}</Typography>
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
    )
}

export default HomePage;