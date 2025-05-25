'use client'

import PostList from "@/common/post-list/PostList"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Pagination, Stack, Tab, Tabs } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { useSearchPostsQuery } from "../../hooks/query"
import { PostSearch } from "@/domains/post/types"
import { useCursor } from "../../hooks/search-data"
import { queryKey } from "@/common/hooks/post-card-hook"

const tabs = ['post', 'people']

function SearchPanel(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const {cursor, setCursor}= useCursor()
    const query = searchParams.get('q') as string
    const page = Number(searchParams.get('page'))
    const source = searchParams.get('source')
    const data = {
        keyword: query,
        cursor: cursor,
        order: 'desc' as PostSearch['order']
    }
    const {data: posts, isLoading} = useSearchPostsQuery(data, page as number)

    const sourceValue = tabs.findIndex(item=>item === source)
    const handleTab = (event: React.SyntheticEvent, newValue: number) =>{
        router.replace(`${PagePath[Page.Search]}?q=${query}&page=${page}&source=${tabs[newValue]}`)
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        setCursor(posts[posts.length-1].id)
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