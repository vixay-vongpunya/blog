'use client'
import HorizontalBlogCard from "@/components/HorizontalBlogCard";
import MoreButton from "@/components/MoreButton";
import SmallBlogCard from "@/components/SmallBlogCard";
import { blogs } from "@/data/blogs";
import SecondLayout from "@/layouts/SecondaryLayout";
import { useAuth } from "@/providers/AuthProvider";
import { Box, Button, Stack, Typography } from "@mui/material";

function ProfilePanel(){
    const {user} = useAuth()
    const leftSection = (
        <Stack>
            <Typography> What's hot</Typography>
            <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}> Most Popular</Typography>
            <Stack sx={{gap: '1.5em'}}>
                <HorizontalBlogCard blogs={blogs} limit={10}/> 
            </Stack>
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
        <SecondLayout LeftSection={leftSection} RightSection={rightSection} />
    )
}

export default ProfilePanel;