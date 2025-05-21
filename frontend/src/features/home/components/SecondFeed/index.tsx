import { Box, Typography, Stack } from "@mui/material"
import {RoundButton} from "@/components/Button"
import SmallBlogCard from "@/components/SmallBlogCard"
import MoreButton from "@/components/MoreButton"
import SecondLayout from "@/layouts/SecondaryLayout"
import HorizontalPostList from "@/common/horizonal-post-list/HorizontalPostList"
import { queryKey } from "@/common/hooks/post-card-hook"
import { useGetRecentPostsQuery } from "../../hooks/query"

function SecondFeed(){
    //better to fetch here
    const { data } = useGetRecentPostsQuery()
    const leftSection = (
        <Box sx={{ flex:1}}>
            <Typography variant="h4" sx={{fontWeight: 'bold'}}>Recent Posts</Typography>
            <Box sx={{
                display:"flex", 
                flexDirection:"column", 
                gap:3,
                paddingRight: '5em'}}>
                <HorizontalPostList posts={data?.posts.slice(0,10)} queryKey={queryKey.allPost}/>
            </Box>
            <RoundButton text='See all recent posts' onClick={()=>{}}/>
        </Box>
    ) 

    const rightSection = (
        <Stack>
            <Box>
                <Typography> What's hot</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}> Most Popular</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {data?.posts.slice(0,3).map((item)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>  
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {data?.posts.slice(0,2).map((item)=>(
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