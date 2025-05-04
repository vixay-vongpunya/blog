"use client";

import { Box, Card, Divider, Stack, Typography, useColorScheme } from "@mui/material";
import Header from "../Header";
import {useCallback, useEffect, useRef, useState} from "react";
import CommentPanel from "../../Comment/CommentPanel";
import AuthorCard from "../AuthorCard";
import TabelofContent from "../TableofContent";
import { useGetMyPostsQuery } from "@/features/profile/hooks/query";
import PostList from "@/common/post-list/PostList";
import { useGetPostQuery } from "../../hooks/query";
import { UserProvider } from "@/providers/UserProvider";
import { defaultBlockSchema, HTMLToBlocks } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "./style.css";
import { BlockNoteView } from "@blocknote/mantine";

type PostProps = {
    postId: string 
}

function Post({postId}: PostProps){
    const contentRef = useRef<HTMLDivElement>(null)
    const {data: posts} = useGetMyPostsQuery()
    const {data: post} = useGetPostQuery(postId)
    const {mode} = useColorScheme()
    const [isContentRendered, setIsContentRendered] = useState(false);

    // even with isLoading typscript still raise undefined, so need to check l
    const editor = useCreateBlockNote()
    const loadPostContent = useCallback(async () => {
        if (post?.content) {
            const blocks = await editor.tryParseHTMLToBlocks(post.content);
            editor.replaceBlocks(editor.document, blocks);
            // blocknote here is an asyncronous function, need to make sure that content is rendered
            // before rendering table of content
           setIsContentRendered(true);
        }
    }, [editor, post?.content]);

    useEffect(() => {
        loadPostContent(); 
    }, [loadPostContent]);

    if(!post){
        return<>loading...</>
    }
    
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
                    <Header author={post.author}/>   
                    <Box ref={contentRef}>
                        <BlockNoteView 
                            editor={editor}
                            editable={false}
                            theme={mode as 'light' | 'dark'}
                        />
                    </Box>             
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
                        {isContentRendered && <TabelofContent contentRef={contentRef}/>}
                    </Box>
                </Box>
                
           </Box>
            <Box sx={{marginY:4}}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>Related posts</Typography>
                <PostList posts={posts}/>
            </Box>
        </Stack>
    )
}

export default Post;
