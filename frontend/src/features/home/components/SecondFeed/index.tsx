import { Box, Typography, Stack } from "@mui/material"
import RecentPostCard from "../RecentPostCard"
import {RoundButton} from "@/components/Button"
import SmallBlogCard from "@/components/SmallBlogCard"
import MoreButton from "@/components/MoreButton"
import { Post } from "@/domains/post/types"
import SecondLayout from "@/layouts/SecondaryLayout"

type SecondFeedProps = {
    posts: Post[] | undefined
}

function SecondFeed({posts}: SecondFeedProps){
    const leftSection = (
        <Box sx={{ flex:1}}>
            <Typography variant="h4" sx={{fontWeight: 'bold'}}>Recent Posts</Typography>
            <RecentPostCard posts={posts?.slice(0,10)}/>
            <RoundButton text='See all recent posts' onClick={()=>{}}/>
        </Box>
    ) 

    const rightSection = (
        <Stack>
            <Box>
                <Typography> What's hot</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}> Most Popular</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {posts?.slice(0,3).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>  
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {posts?.slice(0,2).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>
        </Stack>
    )
    return(
        <SecondLayout rightSection={rightSection} leftSection={leftSection}/>
    )
}

export default SecondFeed