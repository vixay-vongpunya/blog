'use client'

import PostList from "@/common/post-list/PostList"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Box, Pagination, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { useSearchPostsQuery} from "../../hooks/query"
import { PostSearch } from "@/domains/post/types"
import { useCursor } from "../../hooks/search-data"
import { queryKey } from "@/common/hooks/post-card-hook"
import React, { useState } from "react"
import { InfiniteScrollIcon, PaginationIcon } from "@/components/Icons/CustomIcons"
import InfiniteScrollDisplay from "../InfiniteScrollDisplay"
import PaginationDisplay from "../PaginationDisplay"

const tabs = ['post', 'people']
const orders = ['alltime', 'latest']
// enable both infinit scroll and pagination
// both use cursor-based but for pagination need to store ids

function SearchPanel(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') as string
    const page = Number(searchParams.get('page'))
    const source = searchParams.get('source')
    const order = searchParams.get('order')
    const [infiniteScroll, setInfiniteScroll] = useState<boolean>(false)
    // user tends to go from 1, 2, 3 in most cases, so this is better
    const sourceValue = tabs.findIndex(item=>item === source)

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        router.replace(`${PagePath[Page.Search]}?q=${query}&page=${page}&source=${tabs[newValue]}&order=${order}`)
    }

    const tabBar = (
        <Tabs 
            value={sourceValue} 
            onChange={handleTab}
            indicatorColor="primary"
            textColor="primary">
            {
                tabs.map((tab, index)=>(
                    <Tab key={index} label={tab} sx={{textTransform: 'none'}}/>
                ))
            }
        </Tabs>
    )
    return(
        <Stack gap='4em'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                {tabBar}
                <ToggleButtonGroup 
                    value={order}
                    onChange={(_, value)=>router.replace(`${PagePath[Page.Search]}?q=${query}&page=${page}&source=${source}&order=${value}`)}
                    exclusive
                    sx={{marginLeft: 'auto', marginRight: '0.5em'}}>
                        {
                            orders.map(item=>(
                                <ToggleButton value={item} 
                                    sx={{
                                        height: 'fit-content',
                                        margin: 'auto',
                                        paddingY: 0}}>
                                    {item}
                                </ToggleButton>
                            ))
                        }
                </ToggleButtonGroup>
                {
                    infiniteScroll ? 
                    <Typography onClick={()=>setInfiniteScroll(false)} sx={{cursor: 'pointer'}}>
                        <InfiniteScrollIcon/>
                    </Typography> :
                    <Typography onClick={()=>setInfiniteScroll(true)} sx={{cursor: 'pointer'}}>
                        <PaginationIcon/>
                    </Typography>
                }
            </Box>
            {
            infiniteScroll ? 
            <InfiniteScrollDisplay query={query} page={page}/> :
            <PaginationDisplay query={query} source={tabs[sourceValue]} order={order} page={page} />
            }
        </Stack>
    )
}

export default SearchPanel