'use client'

import PostList from "@/common/post-list/PostList"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Pagination, Stack, Tab, Tabs } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { useSearchPostsQuery } from "../../hooks/query"
import { PostSearch } from "@/domains/post/types"
import { useCursor, usePrevPageNumber } from "../../hooks/search-data"
import { queryKey } from "@/common/hooks/post-card-hook"
import { useEffect } from "react"

const tabs = ['post', 'people']
// enable both infinit scroll and pagination
// both use cursor-based but for pagination need to store ids
function SearchPanel(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const {cursor, setCursor}= useCursor()
    const {prevPageNumber, setPrevPageNumber} = usePrevPageNumber()
    const query = searchParams.get('q') as string
    const page = Number(searchParams.get('page'))
    const source = searchParams.get('source')
    // user tends to go from 1, 2, 3 in most cases, so this is better
    const data = {
        keyword: query,
        cursor: cursor,
        take: page - prevPageNumber === 1 ? 1 : (page - prevPageNumber) * 6, 
        order: 'desc' as PostSearch['order']
    }
    console.log(page, prevPageNumber, data)
    const {data: posts, isLoading} = useSearchPostsQuery(data, page as number)

    const sourceValue = tabs.findIndex(item=>item === source)

    const handleTab = (event: React.SyntheticEvent, newValue: number) =>{
        router.replace(`${PagePath[Page.Search]}?q=${query}&page=${page}&source=${tabs[newValue]}`)
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        setCursor(posts[posts.length-1].id)
        setPrevPageNumber(page)
        router.push(`${PagePath[Page.Search]}?q=${query}&page=${page}&source=${tabs[sourceValue]}`)
    }


    const tabBar = (
        <Tabs value={sourceValue} 
            onChange={handleTab}
            indicatorColor="primary"
            textColor="primary"
            sx={{borderBottom: 1, borderColor: 'divider'}}>
            {
                tabs.map((tab, index)=>(
                    <Tab key={index} label={tab} sx={{textTransform: 'none'}}/>
                ))
            }
        </Tabs>
    )
    if(isLoading || !posts){
        <>searching...</>
    }
    console.log("trigger",posts)
    return(
        <Stack gap='4em'>
            {tabBar}
            <PostList posts={posts?.slice(0,20)} queryKey={queryKey.searchPosts(query, page)}/>
            <Pagination hideNextButton hidePrevButton count={10}
                sx={{alignSelf: 'center'}} onChange={handlePagination}/>
        </Stack>
    )
}

export default SearchPanel