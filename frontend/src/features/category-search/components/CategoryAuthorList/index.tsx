'use client'

import { Category } from "@/domains/category/types"
import { useGetAuthorsByCategory } from "../../hooks/query"
import { Breadcrumbs, Stack, Typography } from "@mui/material"
import FollowingList from "@/components/FollowingList"
import { useEffect, useRef } from "react"
import { useInfinitPostlistObserver } from "@/utils/hooks/post/InfinitePostlistObserver"
import { useRouter } from "next/navigation"
import { Page, PagePath } from "@/providers/PageProviders/hook"

type CategoryAuthorListProps = {
    category: Category
}

function CategoryAuthorList({category}: CategoryAuthorListProps){
    const router = useRouter()
    const loadMoreRef = useRef<HTMLDivElement | null>(null)
    const {data: authors, hasNextPage, fetchNextPage} = useGetAuthorsByCategory(category.id)

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
            px:"8em",
            mt:"4em"
        }}>
            <Breadcrumbs separator='>'>
                <Typography color='primary' 
                    sx={{cursor: 'pointer', '&:hover': {textDecoration: 'underline'}}} 
                    onClick={()=>router.push(`${PagePath[Page.Category]}/${category.name}-${category.id}`, { shallow: true } as any)}>
                        {category.name}
                </Typography>
                <Typography>authors</Typography>
            </Breadcrumbs>
            {authors?.pages.map((page, index)=>
                <FollowingList key={index} authors={page}/>
            )}
            <div ref={loadMoreRef}/>
        </Stack>
    )
}

export default CategoryAuthorList