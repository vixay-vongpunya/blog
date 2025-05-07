'use client'
import {  Button, Stack, Typography } from "@mui/material";
import SearchResultContent from "../SearchResultContent";
import { useCreateCategorySubscription, useGetPostsByCategory } from "../../hooks/query";
import { Category } from "@/domains/category/types";


type CategorySearchPanelProps = {
    category: Category
}

function CategorySearchPanel({category}: CategorySearchPanelProps){
    const {mutate: categorySubscription} = useCreateCategorySubscription()
    const {data: postData} = useGetPostsByCategory(category.id)
    console.log(postData)
    if(!postData){
        return<>loading...</>
    }
    const {posts, isSubscribed} = postData
    const handleFollowClick = () =>{
        if(postData.isSubscribed){

        }
        else{
            categorySubscription(category.id)
        }
    }
    return(
        <>
            <Stack sx={{ marginX: 'auto', marginBottom: '5em', alignItems: 'center', gap:2 }}>
                <Typography variant='h2' textAlign='center'>{category.name}</Typography>
                <Typography variant='body1' color='text.secondary'>44k followers &middot; 1.1k following</Typography>
                    <Button variant= {isSubscribed ? 'outlined': 'contained'} sx={{
                        padding: '0.5em 1em', 
                        borderRadius: '99em', 
                        width: 'fit-content',
                        justifySelf: 'center'}}
                        onClick={()=>handleFollowClick()}>{isSubscribed ? 'Following': 'Follow'}</Button>     
            </Stack>
            <SearchResultContent posts={posts}/>           
        </>
    )
}

export default CategorySearchPanel;