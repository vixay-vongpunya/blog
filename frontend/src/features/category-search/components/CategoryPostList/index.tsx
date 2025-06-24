'use client'
import { Category } from "@/domains/category/types";
import { useGetPostsByCategory } from "../../hooks/query";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import NestedPosts from "@/components/NestedPosts";
import { queryKey } from "@/components/post-list-hooks/post-card-hook";

type CategoryPostListProps = {
    category: Category,
}

function CategoryPostList({category}: CategoryPostListProps){
    const {data: posts, hasNextPage, fetchNextPage} = useGetPostsByCategory(category.id)
    
    if(!posts){
        return <>loading...</>
    }

    return(
        <NestedPosts 
            posts={posts} 
            hasNextPage={hasNextPage} 
            fetchNextPage={fetchNextPage} 
            route={`${PagePath[Page.Category]}/${category.name}-${category.id}`} 
            baseResource={category.name} 
            queryKey={queryKey.postsByCategory(category.id)}/>
    )
}

export default CategoryPostList;