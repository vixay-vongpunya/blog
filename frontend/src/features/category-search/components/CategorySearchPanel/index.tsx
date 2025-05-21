'use client'
import {  Button, Stack, Typography } from "@mui/material";
import SearchResultContent from "../SearchResultContent";
import { useCategorySubscriptionDelete, useCreateCategorySubscription, useGetPostsByCategory } from "../../hooks/query";
import { Category } from "@/domains/category/types";


type CategorySearchPanelProps = {
    category: Category
}

function CategorySearchPanel({category}: CategorySearchPanelProps){
    const {mutate: categorySubscription} = useCreateCategorySubscription()
    const {mutate: categorySubscriptionDelete}  = useCategorySubscriptionDelete()
    const {data: postData} = useGetPostsByCategory(category.id)

    if(!postData){
        return<>loading...</>
    }
    const {posts, subscriptionId} = postData
    
    const handleFollowClick = () =>{
        if(subscriptionId){
            const data = {
                subscriptionId: subscriptionId,
                categoryId: category.id
            }
            categorySubscriptionDelete(data)
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
                    <Button variant= {subscriptionId ? 'outlined': 'contained'} sx={{
                        padding: '0.5em 1em', 
                        borderRadius: '99em', 
                        width: 'fit-content',
                        justifySelf: 'center'}}
                        onClick={()=>handleFollowClick()}>{subscriptionId ? 'Following': 'Follow'}</Button>     
            </Stack>
            <SearchResultContent posts={posts} categoryId={category.id}/>           
        </>
    )
}

export default CategorySearchPanel;