"use client"

import { Box, Card, Pagination, Stack, Typography } from "@mui/material";
import RecentPostCard from "../RecentBlogCard";
import SectionTitle from "@/components/SectionTitle";
import { useGetPostsByAuthorQuery } from "../../hooks/query";
import SmallBlogCard from "@/components/SmallBlogCard";
import MoreButton from "@/components/MoreButton";
import BlogList from "@/common/BlogList";
import SecondaryLayout from "@/layouts/SecondaryLayout";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import CategoryCard from "@/components/CategoryCard";
import { useData } from "@/providers/DataProvider";
import { Post } from "@/api/post";
import { Category } from "@/api/category";
import { useGetPostQuery } from "@/features/post/hooks/query";
import { useGetMyPostsQuery } from "@/features/profile/hooks/query";

function HomePage(){
    const { data: posts, isLoading } = useGetMyPostsQuery()
    const {categories} = useData()
    const router = useRouter()
    console.log(categories)

    if(isLoading){
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
                    {posts?.slice(0,3).map((item : Post)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>  
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {posts?.slice(0,3).map((item : Post)=>(
                        <SmallBlogCard item={item} key={item.id}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>
        </Stack>
    )
    return(
        <Stack sx={{ gap: 2, marginTop: '5em' }}>
            <Box>
                <SectionTitle title="Categories"/>
                <Box sx={{display: "flex", gap:1, marginLeft: '1em'}}>
                {categories.slice(0,5).map((item:Category)=>(
                    <CategoryCard  
                        key={item.id} 
                        name={item.name}
                        onClick={()=>router.push(`${PagePath[Page.Tag]}/${item.name}`)}/>
                ))}
                </Box>
            </Box>   
            <Box>
                <SectionTitle title="From the posts"/>
                <BlogList posts={posts}/>
            </Box>
            <Box sx={{display: "flex", flexDirection:"column"}}>
                <SectionTitle title="Popular Categories"/>
                <Box sx={{display: "flex", gap:1, marginLeft: '1em'}}>
                {categories.slice(0,5).map((item:Category)=>(
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

export default HomePage;