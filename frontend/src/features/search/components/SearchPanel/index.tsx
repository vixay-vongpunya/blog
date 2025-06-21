'use client'

import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react"
import { InfiniteScrollIcon, PaginationIcon } from "@/components/Icons/CustomIcons"
import InfiniteScrollDisplay from "../InfiniteScrollDisplay"
import PaginationDisplay from "../PaginationDisplay"

const tabs = ['post', 'people']
// enable both infinit scroll and pagination
// both use cursor-based but for pagination need to store ids

function SearchPanel(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') as string
    const display = searchParams.get('display') as string
    const page = Number(searchParams.get('page'))
    const source = searchParams.get('source')
    const [infiniteScroll, setInfiniteScroll] = useState<boolean>(false)
    // user tends to go from 1, 2, 3 in most cases, so this is better
    const sourceValue = tabs.findIndex(item=>item.toLowerCase() === source?.toLowerCase())

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        router.replace(`${PagePath[Page.Search]}?q=${query}&display=${display}&page=${page}&source=${tabs[newValue]}`)
    }

    const tabBar = (
        <Tabs 
            value={tabs.findIndex(item=>item === source)} 
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
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                {tabBar}
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
            <PaginationDisplay query={query} source={tabs[sourceValue]} page={page} />
            }
        </Stack>
    )
}

export default SearchPanel