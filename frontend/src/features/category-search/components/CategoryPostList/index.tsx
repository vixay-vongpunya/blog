'use client'
import { Category } from "@/domains/category/types";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { useGetPostsByCategory } from "../../hooks/query";
import { queryKey } from "@/common/hooks/post-card-hook";
import PostList from "@/common/post-list/PostList";
import { useEffect, useRef } from "react";
import { useInfinitPostlistObserver } from "@/utils/hooks/post/InfinitePostlistObserver";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useScreenSize } from "@/utils/useScreenSize";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";

type CategoryPostListProps = {
    category: Category,
}

function CategoryPostList({category}: CategoryPostListProps){
    const loadMoreRef = useRef<HTMLDivElement | null>(null)
    const screen = useScreenSize()
    const {data: posts, hasNextPage, fetchNextPage} = useGetPostsByCategory(category.id)
    const router = useRouter()

    useEffect(()=>{
        if(!hasNextPage || !loadMoreRef.current) return
        const {observer, cleanup} = useInfinitPostlistObserver(fetchNextPage)
        observer.observe(loadMoreRef.current)
        return cleanup

    },[hasNextPage, fetchNextPage, loadMoreRef])
        
    return(
        <Stack sx={{
            maxWidth:"lg",
            mx:"auto",
            gap:"4em",
            px:{
                sm: "2em",
                md: "4em",
                lg: "8em"}
                ,
            mt:"4em"
        }}>
            <Breadcrumbs separator='>'>
                <Typography color='primary' 
                    sx={{cursor: 'pointer', '&:hover': {textDecoration: 'underline'}}} 
                    onClick={()=>router.push(`${PagePath[Page.Category]}/${category.name}-${category.id}`, { shallow: true } as any)}>
                        {category.name}
                </Typography>
                <Typography>posts</Typography>
            </Breadcrumbs>
            <Stack gap="4em">
                {
                    screen === "mobile"?
                    posts?.pages.map((page, index)=>
                        <HorizontalPostList key={index} isProfile={false} posts={page} queryKey={queryKey.postsByCategory(category.id)}/>
                    )
                    :
                    posts?.pages.map((page, index)=>
                        <PostList key={index} posts={page} queryKey={queryKey.postsByCategory(category.id)}/>
                    )
                }
            </Stack>
            <div ref={loadMoreRef}/>
        </Stack>
    )
}

export default CategoryPostList;