"use client"

import { Box,  Stack, Typography } from "@mui/material";
import RecentPostCard from "../RecentBlogCard";
import SectionTitle from "@/components/SectionTitle";
import { useGetAllPostsQuery } from "../../hooks/query";
import SmallBlogCard from "@/components/SmallBlogCard";
import MoreButton from "@/components/MoreButton";
import SecondaryLayout from "@/layouts/SecondaryLayout";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import CategoryCard from "@/components/CategoryCard";
import { useData } from "@/providers/DataProvider";
import PostList from "@/common/post-list/PostList";

function HomPanel(){
    const { data: posts} = useGetAllPostsQuery()
    const {categories} = useData()
    const router = useRouter()
    console.log(categories)

    if(!posts){
        return<>loading...</>
    }
    
    const leftSection = (
        <Box sx={{ flex:1}}>
            <SectionTitle title="Recent Posts"/>
            <RecentPostCard posts={posts}/>
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
        <Stack sx={{ gap: 2 }}>
            <Box>
                <SectionTitle title="Categories"/>
                <Box sx={{display: "flex", gap:1, marginLeft: '1em'}}>
                {categories.slice(0,5).map((item)=>(
                    <CategoryCard  
                        key={item.id} 
                        name={item.name}
                        onClick={()=>router.push(`${PagePath[Page.Tag]}/${item.name}`)}/>
                ))}
                </Box>
            </Box>   
            <Box>
                <SectionTitle title="From the posts"/>
                <PostList posts={posts}/>
            </Box>
            <Box sx={{display: "flex", flexDirection:"column"}}>
                <SectionTitle title="Popular Categories"/>
                <Box sx={{display: "flex", gap:1, marginLeft: '1em'}}>
                {categories.slice(0,5).map((item)=>(
                    <CategoryCard  
                        key={item.id} 
                        name={item.name}
                        onClick={()=>router.push(`${PagePath[Page.Tag]}/${item.name}`)}/>
                ))}
                </Box>
            </Box>
            <SecondaryLayout leftSection={leftSection} rightSection={rightSection} />        
        </Stack>
    )
}

export default HomPanel;