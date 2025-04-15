"use client";

import { Box, Typography } from "@mui/material";
import Header from "./Header";
import TabelOfContent, { HeadingProps } from "./TableOfContent";
import BlogCard from "../../components/BlogCard";
import { blogs } from "@/data/blogs";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBlogInfo } from "./hooks/query";
import { usePathname } from "next/navigation";
import useIntersectinObserver from "./hooks/useIntersectionObserver";


function Post(){
    const pathname = usePathname()
    const { data:blogData } = useBlogInfo(pathname)
    const contentRef = useRef<HTMLDivElement>(null)

    // even with isLoading typscript still raise undefined, so need to check l
    if(!blogData){
        return<>loading</>
    }

    return(
        <Box sx={{
            maxWidth:"lg",
            marginX: "auto",
            paddingTop: 6, 
            gap:2,}}>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "7fr 2fr",
                gap:2,
                }}>
                <Box sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 6
                }}>
                    <style>{`
                        .post-content img, iframe{
                            display: block;
                            margin: 10px auto;
                        }
                        `}</style>
                    <Header/>                
                    <Box className="post-content" ref={contentRef} dangerouslySetInnerHTML={{__html: blogData}} ></Box>
                </Box>
                <Box>
                    <Box sx={{
                        display: "flex", 
                        flexDirection: "column", 
                        gap:2, 
                        position: "sticky", 
                        top: 20, 
                        zIndex: 20
                        }}>
                        <Box sx={{height: "30vh", boxShadow: 2, borderRadius: 2}}>
                        </Box>
                        <TabelOfContent contentRef={contentRef}/>
                    </Box>
                </Box>
           </Box>
            <Box sx={{marginY:4}}>
                <SectionTitle title="Related Blogs"/>
                <Box className="grid grid-cols-3 gap-6">
                    {blogs.map(({key, title, content, author, created}, index)=>(
                        <BlogCard id={key} title={title} content={content} author={author} created={created}/>
                    ))}
                </Box>
            </Box>

        </Box>
        
    )
}

export default Post;
