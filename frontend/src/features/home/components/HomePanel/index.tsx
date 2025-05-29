"use client"

import { Stack, Typography } from "@mui/material";
import { useGetAllPostsQuery } from "../../hooks/query";
import PostList from "@/common/post-list/PostList";
import { useGetCategoryQuery } from "@/utils/globalQuery";
import {RoundButton} from "@/components/Button";
import SecondFeed from "../SecondFeed";
import CategoryList from "@/components/CategoryList";
import { queryKey } from "@/common/hooks/post-card-hook";

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
                <PostList posts={posts?.page} queryKey={queryKey.allPosts}/>
                <RoundButton text='See more posts' onClick={()=>{}}/>
            </Stack>
            <SecondFeed/>               
        </Stack>      
    )
}

export default HomePanel;