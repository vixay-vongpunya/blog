'use client'
import { Box, Divider, Stack, Typography } from "@mui/material"
import { useGetAccount, useGetPostsByAuthorQuery } from "../../hooks/query"
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList"
import { queryKey } from "@/common/hooks/post-card-hook"
import { useEffect, useRef } from "react"
import { useInfinitPostlistObserver } from "@/utils/hooks/post/InfinitePostlistObserver"

type ProfilePostListProps = {
    userName: string
}

function ProfilePostList({userName}: ProfilePostListProps){
    const loadMoreRef = useRef<HTMLDivElement | null>(null)
    const {data: user} = useGetAccount(userName)

    const {data: posts, hasNextPage, fetchNextPage} = useGetPostsByAuthorQuery(user?.id)
    
    useEffect(()=>{
        if(!hasNextPage || !loadMoreRef.current) return
        const {observer, cleanup} = useInfinitPostlistObserver(fetchNextPage)
        observer.observe(loadMoreRef.current)
        return cleanup

    },[hasNextPage, fetchNextPage, loadMoreRef])

    if(!user || !posts ){
        return <>loading</>
    }

    return(
        <Stack gap={2}>
            <Typography variant="h2">{user?.name}</Typography>
            <Divider/>
            <Typography variant="h4">Stories</Typography>
            <Box sx={{
                display:"flex", 
                flexDirection:"column", 
                gap:4,
                paddingRight: '5em'}}>
                {posts?.pages.map((page, index)=>
                    <HorizontalPostList key={index} posts={page} queryKey={queryKey.userPosts} isProfile={true}/>
                )}
            </Box>
            <div ref={loadMoreRef}/>
        </Stack>
    )
}

export default ProfilePostList