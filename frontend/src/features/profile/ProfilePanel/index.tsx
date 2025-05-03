'use client'

import MoreButton from "@/components/MoreButton";
import SecondLayout from "@/layouts/SecondaryLayout";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useUser } from "@/providers/UserProvider";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import { useGetMyPostsQuery } from "../hooks/query";
import { useGetSelfSubscription } from "@/utils/globalQuery";
import CategoryCard from "@/components/CategoryCard";

function ProfilePanel({userId}:{userId: string | undefined}){
    const {user} = useUser()
    const {data: posts} = useGetMyPostsQuery()
    const {data: subscriptions, isLoading} = useGetSelfSubscription()

    if(isLoading){
        return<>loading...</>
    }   

    const leftSection = (
        <Stack>
            <Typography variant="h4">My posts</Typography>
            <Box sx={{
                display:"flex", 
                flexDirection:"column", 
                gap:4,
                paddingRight: '5em'}}>
                <HorizontalPostList posts={posts?.slice(0,10)}/>
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
                gap:'1em'
            }}>
                <Typography variant="h4" 
                    sx={{fontWeight: "bold",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 1,
                    }} >{user?.name}</Typography>
                <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em', width: 'fit-content'}}>
                {user ? 'Edit Profile' : 'Follow'}</Button> 
                <Typography variant='body2' color='text.secondary'>44k followers &middot; 1.1k following</Typography>
            </Stack>
            <Stack>
                {subscriptions.categorySubscription?.map((item: any, index:number)=>{
                    <CategoryCard key={index} name={item.categoryId} onClick={()=>{}}/>
                })}
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