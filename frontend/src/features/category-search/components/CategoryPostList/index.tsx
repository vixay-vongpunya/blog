'use client'
import { Category } from "@/domains/category/types";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { useGetPostsByCategory } from "../../hooks/query";
import { queryKey } from "@/components/post-list-hooks/post-card-hook";
import PostList from "@/components/post-list/PostList";
import { useEffect, useRef } from "react";
import { useInfinitPostlistObserver } from "@/utils/hooks/post/InfinitePostlistObserver";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useMatchMedia } from "@/utils/useMatchMedia";
import HorizontalPostList from "@/components/horizonal-post-list/HorizontalPostList";
import PostListBasedCard from "@/components/PostListBasedCard";

type CategoryPostListProps = {
    category: Category,
}

function CategoryPostList({category}: CategoryPostListProps){
    const loadMoreRef = useRef<HTMLDivElement | null>(null)
    const matchMedia = useMatchMedia()
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
            position: 'relative',
            maxWidth:"lg",
            mx:"auto",
            gap:{
                xs: "2em",
                sm: "4em"
            },
            mt:{
                xs: "80px",
                sm: "100px"
            }
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
                    posts?.pages.map((page, index)=>
                        <PostListBasedCard key={index} posts={page} pageNumber={index} queryKey={queryKey.postsByCategory(category.id)}/>
                    )
                }
            </Stack>
            <div ref={loadMoreRef}/>
        </Stack>
    )
}

export default CategoryPostList;