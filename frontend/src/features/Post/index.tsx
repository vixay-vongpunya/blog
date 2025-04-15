"use client";

import { Box, Typography } from "@mui/material";
import Header from "./Header";
import TabelOfContent, { HeadingProps } from "./TableOfContent";
import { useExtractHeadings } from "./hooks/useExtractHeadings";
import BlogCard from "../../components/BlogCard";
import { blogs } from "@/data/blogs";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBlogInfo } from "./hooks/query";
import { usePathname } from "next/navigation";
import useIntersectinObserver from "./hooks/useIntersectionObserver";


function Post(){
    const [html, setHtml] = useState<string>('');
    const pathname = usePathname()
    const { data:blogData } = useBlogInfo(pathname)
    const [headings, setHeadings] = useState<{id: string, text: string, tag: string}[]>()
    const contentRef = useRef<HTMLDivElement>(null)
    console.log("refresh")
    useEffect(() => {
        if (blogData){
            const { headings, htmlWithIDs } = useExtractHeadings(blogData); 
            setHtml( htmlWithIDs)
            setHeadings(headings)
            console.log("headings",headings)
        }        
      }, [blogData]);

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
                    <Box className="post-content" ref={contentRef} dangerouslySetInnerHTML={{__html: html}} ></Box>
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
                        {contentRef.current && <TabelOfContent toc={headings} contentRef={contentRef} html={html}/>}
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
