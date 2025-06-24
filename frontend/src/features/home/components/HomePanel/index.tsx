"use client"

import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useGetRecentPostsQuery } from "../../hooks/query";
import { useRouter, useSearchParams } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import SecondLayout from "@/layouts/SecondaryLayout";
import MoreButton from "@/components/MoreButton";
import SmallBlogCard from "@/components/SmallBlogCard";
import { useMemo } from "react";
import HomeFeedPosts from "../HomeFeedPosts";
import HomeFollowingPosts from "../HomeFollowingPosts";

const tabs = ["Feed", "Following"]

function HomePanel(){
    // const { data: posts} = useGetFeedPostsQuery()
    const router = useRouter()
    const { data: posts } = useGetRecentPostsQuery()
    
    const searchParams = useSearchParams()
    const source = searchParams.get("source")

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        router.replace(`${PagePath[Page.Home]}?source=${tabs[newValue]}`)
    }

    const tabBar = (
        <Tabs 
            sx={{
                position: 'relative',
                marginBottom: '2em', 
                backgroundColor: 'background.default', 
                borderBottom: 2, 
                borderColor: 'divider',
            }}
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

    const tabContent = useMemo(() =>{
        switch(source?.toLowerCase()){
            case "feed":
                return <HomeFeedPosts/>
            case "following":
                return <HomeFollowingPosts/>
        }  
    },[source])

    const leftSection = (
        <Box>
            {tabBar}
            <Box sx={{ display:"flex", flexDirection:"column", gap:3, marginTop: 4}}>
                {tabContent}
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