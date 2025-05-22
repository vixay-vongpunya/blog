'use client'

import MoreButton from "@/components/MoreButton";
import SecondLayout from "@/layouts/SecondaryLayout";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList";
import { useGetAccount } from "../../hooks/query";
import { useGetSelf} from "@/utils/globalQuery";
import { useState } from "react";
import ProfileEditModal from "../ProfileEditModel";
import ProfileImage from "@/components/ProfileImage";
import { queryKey } from "@/common/hooks/post-card-hook";
import { useGetPostsByAuthorQuery } from "@/features/home/hooks/query";
import { useUserSubscriptionMutation } from "@/utils/hooks/user";

type ProfilePanelProps = {
    userId: string
}

// this profile can be used for both logged in user and friend profile
// for user: edit profile
// for friend: follow button
function ProfilePanel({userId}: ProfilePanelProps){
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const {data: self} = useGetSelf()
    // get account will fetch, following people too so better 
    // to fetch is subscribed(in case of friend) seperately
    const {data: user} = useGetAccount(userId)
    const {data: posts} = useGetPostsByAuthorQuery(userId)
    const {mutate: userSubscription} = useUserSubscriptionMutation()
    // const {data: subscriptions, isLoading} = useGetSelfSubscription()
    // check user-Subscription here
    const isSelf = self?.id === userId
    
    const handleFollow = () =>{
        userSubscription(userId)
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
                <HorizontalPostList posts={posts?.slice(0,10)} queryKey={queryKey.userPosts} isProfile={true}/>
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
                    </Button> :
                    <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em', width: 'fit-content'}}
                            onClick={()=>handleFollow()}>
                        {isSelf ? 'Following' : 'Follow'}
                    </Button> 
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