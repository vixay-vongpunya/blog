'use client'

import MoreButton from "@/components/MoreButton";
import SecondLayout from "@/layouts/SecondaryLayout";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useUser } from "@/providers/UserProvider";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import { useGetMyPostsQuery } from "../../hooks/query";
import { useGetSelfSubscription } from "@/utils/globalQuery";
import CategoryCard from "@/components/CategoryCard";
import { useState } from "react";
import ProfileEditModal from "../ProfileEditModel";
import ProfileImage from "@/components/ProfileImage";

function ProfilePanel({userId}:{userId: string | undefined}){
    const {user} = useUser()
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const {data: posts} = useGetMyPostsQuery()
    const {data: subscriptions, isLoading} = useGetSelfSubscription()

    if(isLoading){
        return<>loading...</>
    }   

    const leftSection = (
        <Stack sx={{marginTop: '4em', gap:2}}>
            <Typography variant="h2">{user?.name}</Typography>
            <Divider/>
            <Typography variant="h4">Stories</Typography>
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
            <ProfileImage size={74} path={null} alt={user?.name}/>
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
                <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em', width: 'fit-content'}}
                // incase of follow
                    onClick={user ? () => setEditOpen(true) : undefined}>
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
            <ProfileEditModal open={editOpen} onClose={() => setEditOpen(false)}/>
            <SecondLayout leftSection={leftSection} rightSection={rightSection} />
        </Box>
    )
}

export default ProfilePanel;