"use client";

import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Header from "../Header";
import TabelOfContent, { HeadingProps } from "../TableOfContent";
import BlogCard from "../../../components/BlogCard";
import { blogs } from "@/data/blogs";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBlogInfo } from "../hooks/query";
import { usePathname } from "next/navigation";
import CommentPanel from "../Comment";
import AuthorCard from "../AuthorCard";
import BlogList from "@/common/BlogList";

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
            maxWidth:'lg',
            marginX: 'auto',
            gap:2,
            padding: '4em'}}>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "7fr 2fr",
                gap:2,
                }}>
                <Card  variant = 'outlined'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 1,
                        p: '4em',
                        gap: '5em'
                    }}>
                    <style>{`
                        .post-content img, iframe{
                            display: block;
                            margin: 10px auto;
                        }
                        `}</style>
                    <Header/>                
                    <Box className="post-content" ref={contentRef} dangerouslySetInnerHTML={{__html: blogData}} ></Box>
                    <Divider>
                        <AuthorCard id='1'author='Mr. Smith'/>
                    </Divider>
                    <CommentPanel/>
                </Card>
                <Box>
                    <Box sx={{
                        display: "flex", 
                        flexDirection: "column", 
                        gap:2, 
                        position: "sticky", 
                        top: 20, 
                        zIndex: 20
                        }}>
                        <Card variant='outlined' 
                            sx={{height: "30vh", boxShadow: 1, borderRadius: 1}}>
                        </Card>
                        <TabelOfContent contentRef={contentRef}/>
                    </Box>
                </Box>
                
           </Box>
            <Box sx={{marginY:4}}>
                <SectionTitle title="Related Blogs"/>
                <BlogList/>
            </Box>
        </Box>
        
    )
}

export default Post;
