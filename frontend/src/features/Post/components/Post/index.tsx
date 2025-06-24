"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "./style.css";
import { Box, Card, Stack, Typography} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";
import TabelofContent from "../TableofContent";
import { useGetPostQuery, useGetRelatedPostsQuery } from "../../hooks/query";
import { useCreateBlockNote } from "@blocknote/react";
import { useMatchMedia } from "@/utils/useMatchMedia";
import Header from "../Header";
import PostContentCard from "../PostContentCard";
import PostListBasedCard from "@/components/PostListBasedCard";
import { queryKey } from "@/components/post-list-hooks/post-card-hook";
import { RoundButton } from "@/components/Button";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";

type PostProps = {
    postId: string 
}

function Post({postId}: PostProps){
    const router = useRouter()
    const matchMedia = useMatchMedia()
    const contentRef = useRef<HTMLDivElement>(null)
    // const {data: posts} = useGetMyPostsQuery()
    const {data: post} = useGetPostQuery(postId)
    const {data: relatedPosts} = useGetRelatedPostsQuery(postId)
    const [isContentRendered, setIsContentRendered] = useState(false);
    
    let isMobile = matchMedia === "mobile"

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
    console.log("post", post)
    
    return(
        <Stack marginTop="6em">
            <Header title={post.title}/>   
            <Box sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "7fr 2fr"
                },
                gap:2,
                }}>
                {/* post card */}
                <PostContentCard post={post} contentRef={contentRef} editor={editor} isContentRendered={isContentRendered}/>
                {/* sticky side */}
                {!isMobile &&
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
                }
           </Box>
            <Box sx={{marginY:4}}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>Related posts</Typography>
                {/* <PostList posts={posts}/> */}
                {
                    relatedPosts?.pages.map((page, index)=>
                        <PostListBasedCard key={index} pageNumber={index} posts={page} queryKey={queryKey.relatedPosts(postId)}/>
                    )
                }
                <RoundButton text="See more related posts" onClick={()=>router.push(`${PagePath[Page.Post]}/${postId}/related`)}/>
            </Box>
        </Stack>
    )
}

export default Post;
