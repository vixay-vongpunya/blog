"use client"

import { Box, Stack, Typography } from "@mui/material";
import { useGetPopularPostsQuery} from "../../hooks/query";
import { useRouter, useSearchParams } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import SecondLayout from "@/layouts/SecondaryLayout";
import MoreButton from "@/components/MoreButton";
import SmallBlogCard from "@/components/SmallBlogCard";
import HomeFeedPosts from "../HomeFeedPosts";
import HomeFollowingPosts from "../HomeFollowingPosts";
import { TabBar } from "@/components/TabBar";

function HomePanel(){
    // const { data: posts} = useGetFeedPostsQuery()
    const router = useRouter()
    const { data: posts } = useGetPopularPostsQuery()
    
    const searchParams = useSearchParams()
    const source = searchParams.get("source") as string

    const tabs = [{
            source : 'Feed',
            content: <HomeFeedPosts/>
        }, {
            source: 'Following',
            content: <HomeFollowingPosts/>
        }
    ]

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
                <MoreButton onClick={() => router.push(`${PagePath[Page.Home]}/popular-posts`)}/>
            </Box>  
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {posts?.pages[0].slice(0,2).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton onClick={()=>{}}/>
            </Box>
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {posts?.pages[0].slice(0,2).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton onClick={()=>{}}/>
            </Box>
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {posts?.pages[0].slice(0,2).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton onClick={()=>{}}/>
            </Box>
        </Stack>
    )

    return(
        <Stack>
            <SecondLayout rightSection={rightSection} leftSection={
                <TabBar page={PagePath[Page.Home]} currentSource={source} tabs={tabs}/>
            }/>          
        </Stack>      
    )
}

export default HomePanel;