"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "./style.css";
import { Box, Card, Stack, Typography} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";
import TabelofContent from "../TableofContent";
import { useGetPostQuery } from "../../hooks/query";
import { useCreateBlockNote } from "@blocknote/react";
import PostContentCard from "../PostContentCard";
import CommentPanel from "../Comment/CommentPanel";

type PostProps = {
    postId: string 
}

function Post({postId}: PostProps){
    const contentRef = useRef<HTMLDivElement>(null)
    // const {data: posts} = useGetMyPostsQuery()
    const {data: post} = useGetPostQuery(postId)
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
    console.log(post)
    
    return(
        <Stack>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "7fr 2fr",
                gap:2,
                }}>
                {/* post card */}
                <Card  variant = 'outlined'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 1,
                        p: '4em',
                        gap: '5em'
                    }}>
                    <PostContentCard 
                        author={post.author}
                        contentRef={contentRef}
                        editor={editor}
                        />
                    
                    <CommentPanel postId={postId}/>
                </Card>
                
                <Box sx={{
                    display: "flex", 
                    flexDirection: "column", 
                    gap:2, 
                    position: "sticky", 
                    top: 20, 
                    height: 'fit-content'
                    }}>
                    <Card variant='outlined' 
                        sx={{height: "30vh", boxShadow: 1, borderRadius: 1}}>
                    </Card>
                    {isContentRendered && <TabelofContent contentRef={contentRef}/>}
                </Box>
           </Box>
            <Box sx={{marginY:4}}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>Related posts</Typography>
                {/* <PostList posts={posts}/> */}
            </Box>
        </Stack>
    )
}

export default Post;
