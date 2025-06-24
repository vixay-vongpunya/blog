'use client'

import NestedPosts from "@/components/NestedPosts"
import { useGetRelatedPostsQuery } from "../../hooks/query"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { queryKey } from "@/components/post-list-hooks/post-card-hook"

type RelatedPostsProps = {
    postId: string
}

function RelatedPosts({postId}: RelatedPostsProps){
    const {data: posts, hasNextPage, fetchNextPage} = useGetRelatedPostsQuery(postId)
    if(!posts){
        return<>loading...</>
    }
    return(
        <NestedPosts 
            posts={posts} 
            hasNextPage={hasNextPage} 
            fetchNextPage={fetchNextPage} 
            route={`${PagePath[Page.Category]}/${postId}`}  
            baseResource={postId} 
            queryKey={queryKey.relatedPosts(postId)}/>
    )
}

export default RelatedPosts