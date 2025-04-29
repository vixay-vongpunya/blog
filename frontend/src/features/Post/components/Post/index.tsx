"use client";

import { Box, Card, Divider, Stack } from "@mui/material";
import Header from "../Header";
import SectionTitle from "@/components/SectionTitle";
import {useRef} from "react";
import CommentPanel from "../../Comment/CommentPanel";
import AuthorCard from "../AuthorCard";
import TabelofContent from "../TableofContent";
import { useGetMyPostsQuery } from "@/features/profile/hooks/query";
import PostList from "@/common/post-list/PostList";
import { Post as PostType } from "@/api/post";
import { useGetPostQuery } from "../../hooks/query";
import { UserProvider } from "@/providers/UserProvider";


type PostProps = {
    postId: string 
}

function Post({postId}: PostProps){
    const contentRef = useRef<HTMLDivElement>(null)
    const {data: posts} = useGetMyPostsQuery()
    const {data:post, isLoading} = useGetPostQuery(postId)

    if(isLoading || !post){
        return <>loading...</>
    }
    if(!posts){
        return<>loading...</>
    }
    console.log('was reload', post)
    console.log('hey',post)

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
                    <Header author={post.author}/>                
                    <Box className="post-content" ref={contentRef} dangerouslySetInnerHTML={{__html: post.content}} ></Box>
                    <Divider>
                        <AuthorCard id='1'author='Mr. Smith'/>
                    </Divider>
                    {/* might not be ideal */}
                    <UserProvider>
                        <CommentPanel postId={post.id} comments = {post.comments}/>
                    </UserProvider>
                    
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
                <PostList posts={posts}/>
            </Box>
        </Stack>
        
    )
}

export default Post;
