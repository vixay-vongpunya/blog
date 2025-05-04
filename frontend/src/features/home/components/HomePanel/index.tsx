"use client"

import { Box,  Stack, Typography } from "@mui/material";
import RecentPostCard from "../RecentPostCard";
import { useGetAllPostsQuery } from "../../hooks/query";
import SmallBlogCard from "@/components/SmallBlogCard";
import MoreButton from "@/components/MoreButton";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import CategoryCard from "@/components/CategoryCard";
import PostList from "@/common/post-list/PostList";
import { useGetCategoryQuery } from "@/utils/globalQuery";
import RoundButton from "@/components/RoundButton";

function HomePanel(){
    const { data: posts} = useGetAllPostsQuery()
    const { data: categories} = useGetCategoryQuery()
    const router = useRouter()

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
            <Stack sx={{ gap: 6, marginTop: '8em'}} >
                <Stack gap={2}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>Categories</Typography>
                    <Box sx={{display: "flex", gap:1, marginLeft: '1em'}}>
                    {categories?.slice(0,5).map((item)=>(
                        <CategoryCard  
                            key={item.id} 
                            name={item.name}
                            onClick={()=>router.push(`${PagePath[Page.Category]}/${item.name}-${item.id}`)}/>
                    ))}
                    </Box>
                </Stack>   
                <Stack gap={2}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>From the posts</Typography>
                    <PostList posts={posts}/>
                    <RoundButton text='See more posts' onClick={()=>{}}/>
                </Stack>
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
        </Stack>      
    )
}

export default HomePanel;