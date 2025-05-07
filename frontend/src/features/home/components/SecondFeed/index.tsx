import { Box, Typography, Stack } from "@mui/material"
import RecentPostCard from "../RecentPostCard"
import {RoundButton} from "@/components/Button"
import SmallBlogCard from "@/components/SmallBlogCard"
import MoreButton from "@/components/MoreButton"
import { Post } from "@/domains/post/types"

type SecondFeedProps = {
    posts?: Post[]
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
                    {posts?.slice(0,3).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>
        </Stack>
    )
    return(
        <Box sx={{
            mx: "auto",
            maxWidth: "lg",
            display: "grid",
            gridTemplateColumns: "5fr 2fr",
            gap: 4,
            }}> 
            {leftSection}
            <Box sx={{
                paddingLeft: '2em',
                paddingTop: '2em',
                position: "sticky",
                top:0,
                borderLeft: "1px solid #ccc",
                height: 'fit-content'
                }} >
                {rightSection}
            </Box>
        </Box>
    )
}

export default SecondFeed