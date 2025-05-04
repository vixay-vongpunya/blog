'use client'

import PostList from "@/common/post-list/PostList"
import { useGetAllPostsQuery } from "@/features/home/hooks/query"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Pagination, Stack, Tab, Tabs } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"

const tabs = ['post', 'people']

function SearchPanel(){
    const {data: posts} = useGetAllPostsQuery()
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const page = searchParams.get('page')
    const source = searchParams.get('source')
    const router = useRouter()

    const sourceValue = tabs.findIndex(item=>item === source)

    const handleTab = (event: React.SyntheticEvent, newValue: number) =>{
        router.push(`${PagePath[Page.Search]}?q=${query}&page=${page}&source=${tabs[newValue]}`)
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
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
    return(
        <Stack gap='4em'>
            {tabBar}
            <PostList posts={posts?.slice(0,20)}/>
            <Pagination hideNextButton hidePrevButton count={10}
                sx={{alignSelf: 'center'}} onChange={handlePagination}/>
        </Stack>
    )
}

export default SearchPanel