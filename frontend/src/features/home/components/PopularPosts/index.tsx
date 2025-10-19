'use client'

import { useGetPopularPostsQuery } from "../../hooks/query";
import NestedPosts from "@/components/NestedPosts";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { queryKey } from "@/components/post-list-hooks/post-card-hook";


function PopularPosts(){
    const {data: popularPosts, hasNextPage, fetchNextPage} = useGetPopularPostsQuery()

    if(!popularPosts) return <>loading</>
    return(
        <NestedPosts 
            
            posts={popularPosts}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            route={`${PagePath[Page.Home]}?source=feed`}
            baseResource="home"
            queryKey={queryKey.popularPosts}
        />
    )
}

export default PopularPosts;