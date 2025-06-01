'use client'

import MoreButton from "@/components/MoreButton";
import SecondLayout from "@/layouts/SecondaryLayout";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import { useDeleteUserSubscriptionMutation, useGetAccount, useGetUserSubscriptionQuery } from "../../hooks/query";
import { useState } from "react";
import ProfileEditModal from "../ProfileEditModel";
import ProfileImage from "@/components/ProfileImage";
import { queryKey } from "@/common/hooks/post-card-hook";
import { useGetPostsByAuthorQuery } from "@/features/home/hooks/query";
import { useGetSelfQuery, useUserSubscriptionMutation } from "@/utils/hooks/user/query";
import { SubscribeButton } from "@/components/Button";

type ProfilePanelProps = {
    userId: string
}

// this profile can be used for both logged in user and friend profile
// for user: edit profile
// for friend: follow button
function ProfilePanel({userId}: ProfilePanelProps){
    const [editOpen, setEditOpen] = useState<boolean>(false)
    // this is prefetched
    const {data: self} = useGetSelfQuery()
    const isSelf = self?.id === userId

    // get account will fetch, following people too so better 
    // to fetch is subscribed(in case of friend) seperately
    const {data: user} = useGetAccount(userId)
    // this query is only for when it is not the logged in user
    const {data: userSubscription} = useGetUserSubscriptionQuery(userId, !isSelf)
    const {data: posts} = useGetPostsByAuthorQuery(userId)
    const {mutate: userSubscriptionMutate} = useUserSubscriptionMutation()
    const {mutate: deleteUserSubscriptionMutate} = useDeleteUserSubscriptionMutation()
    // const {data: subscriptions, isLoading} = useGetSelfSubscription()
    // check user-Subscription here

    
    const handleFollow = () =>{
        if(userSubscription.subscription.id){
            console.log(userSubscription.subscription.id)
            const data = {
                subscriptionId: userSubscription.subscription.id,
                authorId: userId
            }
            deleteUserSubscriptionMutate(data)
        }
        else{
            userSubscriptionMutate(userId)
        }
    }

    if(!user || !userSubscription ){
        return <></>
    }

    console.log(userSubscription)

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
                <HorizontalPostList posts={posts?.pages[0].slice(0,10)} queryKey={queryKey.userPosts} isProfile={true}/>
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
            <ProfileImage size='large' path='' alt={user?.name}/>
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
                    { isSelf ? 
                        <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em', width: 'fit-content'}}
                            onClick={() => setEditOpen(true)}>
                            Edit Profile
                        </Button> 
                        :
                        <SubscribeButton isSubscribed={userSubscription.id} handleSubscribe={handleFollow} handleUnsubscribe={handleFollow}/>
                    }
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
            <ProfileEditModal open={editOpen} onClose={() => setEditOpen(false)}/>
            <SecondLayout leftSection={leftSection} rightSection={rightSection} />
        </Box>
    )
}

export default ProfilePanel;