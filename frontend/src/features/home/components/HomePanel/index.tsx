"use client"

import { Stack, Typography } from "@mui/material";
import { useGetAllPostsQuery } from "../../hooks/query";
import PostList from "@/common/post-list/PostList";
import { useGetCategoryQuery } from "@/utils/globalQuery";
import RoundButton from "@/components/RoundButton";
import SecondFeed from "../SecondFeed";
import CategoryList from "@/components/CategoryList";

function HomePanel(){
    const { data: posts} = useGetAllPostsQuery()
    const { data: categories} = useGetCategoryQuery()

    return(
        <Stack sx={{ gap: 6, marginTop: '8em'}} >
            <Stack gap={2}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>Categories</Typography>
                <CategoryList categories={categories}/>
            </Stack>   
            <Stack gap={2}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>From the posts</Typography>
                <PostList posts={posts}/>
                <RoundButton text='See more posts' onClick={()=>{}}/>
            </Stack>
            <SecondFeed posts={posts}/>               
        </Stack>      
    )
}

export default HomePanel;