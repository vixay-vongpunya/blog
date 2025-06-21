"use client"

import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { queryKey } from "@/common/hooks/post-card-hook";
import { useGetCategoryQuery } from "@/utils/hooks/category/query";
import { useGetFeedPostsQuery, useGetRecentPostsQuery } from "../../hooks/query";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import { useRouter, useSearchParams } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import SecondLayout from "@/layouts/SecondaryLayout";
import MoreButton from "@/components/MoreButton";
import SmallBlogCard from "@/components/SmallBlogCard";

const tabs = ["For you", "Following"]

function HomePanel(){
    // const { data: posts} = useGetFeedPostsQuery()
    const router = useRouter()
    const { data: posts } = useGetRecentPostsQuery()
    const { data: categories} = useGetCategoryQuery()
    
    const searchParams = useSearchParams()
    const source = searchParams.get("source")

    console.log(posts)
    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        router.replace(`${PagePath[Page.Home]}?source=${tabs[newValue]}`)
    }

    const tabBar = (
        <Tabs 
            value={tabs.findIndex(item=>item.toLowerCase() === source?.toLowerCase())} 
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

    const leftSection = (
        <Box>
            {tabBar}
            <Box sx={{ display:"flex", flexDirection:"column", gap:3, marginTop: 4}}>
                {posts?.pages.map((page, index)=>
                    <HorizontalPostList key={index} posts={page} queryKey={queryKey.allPosts} isProfile={false}/>
                )}
            </Box>
        </Box>
    ) 

    const rightSection = (
        <Stack>
            <Box>
                <Typography> What's hot</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Most Popular</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {posts?.pages[0].slice(0,3).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>  
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {posts?.pages[0].slice(0,2).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>
        </Stack>
    )

    return(
        <Stack sx={{ gap: 6}}>
            <SecondLayout rightSection={rightSection} leftSection={leftSection}/>          
        </Stack>      
    )
}

export default HomePanel;