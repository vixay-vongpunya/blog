import PostListBasedCard from "@/components/PostListBasedCard"
import { Post } from "@/domains/post/types"
import { useInfinitPostlistObserver } from "@/utils/hooks/post/InfinitePostlistObserver"
import { Breadcrumbs, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

type NestedPostsProps = {
    posts: {
        pages: Post[][]
    },
    hasNextPage: boolean,
    fetchNextPage: () => void,
    route: string,
    baseResource: string,
    queryKey: readonly unknown[]

}

function NestedPosts({posts, hasNextPage, fetchNextPage, route, baseResource, queryKey}: NestedPostsProps){
    const loadMoreRef = useRef<HTMLDivElement | null>(null)
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
                    onClick={()=>router.push(route, { shallow: true } as any)}>
                        {baseResource}
                </Typography>
                <Typography>posts</Typography>
            </Breadcrumbs>
            <Stack gap="4em">
                {
                    posts?.pages.map((page, index)=>
                        <PostListBasedCard key={index} posts={page} pageNumber={index} queryKey={queryKey}/>
                    )
                }
            </Stack>
            {
                hasNextPage && <div ref={loadMoreRef}/>
            }
        </Stack>
    )
}

export default NestedPosts