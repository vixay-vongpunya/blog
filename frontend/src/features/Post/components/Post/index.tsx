"use client";

import { Box, Card, Divider, Stack } from "@mui/material";
import Header from "../Header";
import SectionTitle from "@/components/SectionTitle";
import {useRef} from "react";
import CommentPanel from "../../Comment";
import AuthorCard from "../AuthorCard";
import BlogList from "@/common/BlogList";
import TabelofContent from "../TableofContent";
import { useGetPostQuery } from "../../hooks/query";
import { useGetMyPostsQuery } from "@/features/profile/hooks/query";

type PostProps = {
    slug: string
}

function Post({slug}: PostProps){
    const contentRef = useRef<HTMLDivElement>(null)
    const {data: posts} = useGetMyPostsQuery()
    const {data: post, isLoading} = useGetPostQuery(slug)
    if(isLoading || !post){
        return<>loading...</>
    }

    // even with isLoading typscript still raise undefined, so need to check l
    return(
        <Stack>
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
                    <Box className="post-content" ref={contentRef} dangerouslySetInnerHTML={{__html: post.content}} ></Box>
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
                        <TabelofContent contentRef={contentRef}/>
                    </Box>
                </Box>
                
           </Box>
            <Box sx={{marginY:4}}>
                <SectionTitle title="Related Blogs"/>
                <BlogList posts={posts}/>
            </Box>
        </Stack>
        
    )
}

export default Post;
