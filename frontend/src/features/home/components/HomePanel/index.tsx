"use client"

import { Box, Card, Pagination, Stack, Typography } from "@mui/material";
import { blogs, category } from "@/data/blogs";
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



function HomePage(){
    const { data:blogs } = usePostsQuery()
    const router = useRouter()

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
                    {blogs?.slice(0,3).map(({key, title, content, author, created}, index)=>(
                            <SmallBlogCard id={key} title={title} content={content} author={author} created={created}/>
                        ))}
                </Stack>
                <MoreButton/>
                    
            </Box>
            <Box sx={{marginTop: 4}} >
                <Typography>Choosen By The Editors</Typography>
                <Typography variant="h5" sx={{fontWeight:"blod", marginBottom: 4}}>Editors Pick</Typography>
                <Stack sx={{gap: '1.5em'}}>
                    {blogs?.slice(0,3).map(({key, title, content, author, created}, index)=>(
                            <SmallBlogCard id={key} title={title} content={content} author={author} created={created}/>
                        ))}
                </Stack>
                <MoreButton/>
            </Box>
        </Stack>
    )
    return(
    <Stack sx={{
        gap: 2
    }}>
        <Box>
            <SectionTitle title="Categories"/>
            <Box sx={{display: "flex", gap:2, marginLeft: '1em'}}>
                {category.map(({type, number}, index)=>(
                    <CategoryCard  
                        index={index} 
                        type={type}
                        onClick={()=>router.push(`${PagePath[Page.Tag]}/${type}`)}/>
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
                {category.map(({type, number}, index)=>(
                        <CategoryCard  
                            index={index} 
                            type={type}
                            onClick={()=>router.push(`${PagePath[Page.Tag]}/${type}`)}/>
                    ))}
            </Box>
        </Box>
        <SecondaryLayout leftSection={leftSection} rightSection={rightSection} />        
    </Stack>
    )
}

export default HomePage;