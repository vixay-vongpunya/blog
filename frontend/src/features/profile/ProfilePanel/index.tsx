'use client'

import MoreButton from "@/components/MoreButton";
import SecondLayout from "@/layouts/SecondaryLayout";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useUser } from "@/providers/UserProvider";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import { useQueryParams } from "@/providers/QueryParamsProvider";
import { useGetMyPostsQuery } from "../hooks/query";

function ProfilePanel(){
    const {user} = useUser()
    const {queryParams} = useQueryParams()
    const {data: posts, isLoading} = useGetMyPostsQuery()

    if(isLoading){
        return<>loading...</>
    }   

    const leftSection = (
        <Stack>
            <Typography> What's hot</Typography>
            <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}> Most Popular</Typography>
            <Box sx={{
                display:"flex", 
                flexDirection:"column", 
                gap:4,
                paddingRight: '5em'}}>
                <HorizontalPostList posts={posts.slice(0,10)}/>
            </Box>
            <MoreButton/>
        </Stack>        
    )

    const rightSection = (
        <Stack sx={{
            height: '100vh',
            gap: '1em',
            paddingTop: '4em',
        }}>
            <Box  sx={{flexShrink:0, borderRadius: '50%', height: '8em', width: '8em', overflow:'hidden'}}>
                <img src="./../person.jpg" className="object-cover h-full w-full"/>
            </Box>
            <Stack sx={{
                gap:'0.2em'
            }}>
                <Stack flexDirection='row' sx={{alignItems: 'center', gap: '0.5em'}}>
                    <Typography variant="h4" 
                        sx={{fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 1,
                        }} >{user?.name}</Typography>
                    <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em', width: 'fit-content'}}>Follow</Button> 
                </Stack>
                <Typography variant='body2' color='text.secondary'>44k followers &middot; 1.1k following</Typography>
            </Stack>
        </Stack>
    )
    return(
        <Box sx={{
            mx: "auto",
            maxWidth:"lg",
            paddingX: '8em',
            }}>
            <SecondLayout leftSection={leftSection} rightSection={rightSection} />
        </Box>
    )
}

export default ProfilePanel;