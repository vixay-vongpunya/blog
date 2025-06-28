'use client'

import NestedPosts from "@/components/NestedPosts"
import { useGetPostQuery, useGetRelatedPostsQuery } from "../../hooks/query"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { queryKey } from "@/components/post-list-hooks/post-card-hook"
import { useGetCategoryQuery } from "@/utils/hooks/category/query"

type RelatedPostsProps = {
    postId: string
}

function RelatedPosts({postId}: RelatedPostsProps){
    const {data: posts, hasNextPage, fetchNextPage} = useGetRelatedPostsQuery(postId)
    const {data: post} = useGetPostQuery(postId)
    if(!posts || !post){
        return<>loading...</>
    }
    return(
        <NestedPosts 
            posts={posts} 
            hasNextPage={hasNextPage} 
            fetchNextPage={fetchNextPage} 
            route={`${PagePath[Page.Post]}/${postId}`}  
            baseResource={post.title} 
            queryKey={queryKey.relatedPosts(postId)}/>
    )
}

export default RelatedPosts