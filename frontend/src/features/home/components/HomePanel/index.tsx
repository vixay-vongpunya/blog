"use client"

import { Box, Card, Pagination, Stack, Typography } from "@mui/material";
import RecentPostCard from "../RecentBlogCard";
import SectionTitle from "@/components/SectionTitle";
import { usePostsQuery } from "../../hooks/query";
import SmallBlogCard from "@/components/SmallBlogCard";
import MoreButton from "@/components/MoreButton";
import BlogList from "@/common/BlogList";
import SecondaryLayout from "@/layouts/SecondaryLayout";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import CategoryCard from "@/components/CategoryCard";
import { useFetchCategory } from "@/utils/globalQuery";
import { Blog, Category } from "@/data/blogs";



function HomePage(){
    const { data: blogs } = usePostsQuery()
    const { data: category} = useFetchCategory()
    const router = useRouter()
    console.log(category)

    const leftSection = (
        <Box sx={{ flex:1}}>
            <SectionTitle title="Recent Posts"/>
            <RecentPostCard blogs={blogs}/>
        </Box>
    ) 

    const rightSection = (
        <Stack>
            <Box>
                <Typography> What's hot</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}> Most Popular</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {blogs?.slice(0,3).map((item:Blog)=>(
                        <SmallBlogCard item={item}/>
                    ))}
                </Stack>
                <MoreButton/>
            </Box>  
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {blogs?.slice(0,3).map((item:Blog)=>(
                        <SmallBlogCard item={item}/>
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
                <Box sx={{display: "flex", gap:2, marginLeft: '1em'}}>
                    {category?.map((item:Category)=>(
                        <CategoryCard  
                            key={item.id} 
                            name={item.name}
                            onClick={()=>router.push(`${PagePath[Page.Tag]}/${item.name}`)}/>
                    ))}
                </Box>
            </Box>   
            <Box>
                <SectionTitle title="From the Blogs"/>
                <BlogList/>
            </Box>
            <Box sx={{display: "flex", flexDirection:"column"}}>
                <SectionTitle title="Popular Categories"/>
                <Box sx={{display: "flex", gap:2, marginLeft: '1em'}}>
                {category?.map((item:Category)=>(
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