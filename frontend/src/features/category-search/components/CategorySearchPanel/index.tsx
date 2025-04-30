'use client'
import {  Button, Stack, Typography } from "@mui/material";
import SearchResultContent from "../SearchResultContent";
import { useCreateCategorySubscription, useGetPostsByCategory } from "../../hooks/query";
import { useGetSelfSubscription } from "@/utils/globalQuery";
import { Category } from "@/domains/category/types";
import { Subscription } from "@/domains/subscription/types";

type CategorySearchPanelProps = {
    category: Category
}

function CategorySearchPanel({category}: CategorySearchPanelProps){
    const {data: subscriptions} = useGetSelfSubscription()
    const {mutate: categorySubscription} = useCreateCategorySubscription()
    const {data: posts, isLoading} = useGetPostsByCategory(category.id)
    if(!subscriptions){
        return <>loading...</>
    }
    const isFollowing = subscriptions.categorySubscription.some((item: Subscription)=>item.categoryId === category.id)
    console.log(isFollowing)
    if(!posts){
        return<>loading...</>
    }

    const handleFollowClick = () =>{
        if(isFollowing){

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
                    <Button variant={isFollowing ? 'outlined': 'contained'} sx={{
                        padding: '0.5em 1em', 
                        borderRadius: '99em', 
                        width: 'fit-content',
                        justifySelf: 'center'}}
                        onClick={()=>handleFollowClick()}>{isFollowing ? 'Following': 'Follow'}</Button>     
            </Stack>
              {!isLoading &&  <SearchResultContent posts={posts}/>}               
        </>
    )
}

export default CategorySearchPanel;