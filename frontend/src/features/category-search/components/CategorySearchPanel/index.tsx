'use client'
import {  Button, Stack, Typography } from "@mui/material";
import { useCategorySubscriptionDelete, useCreateCategorySubscription, useGetAuthorsByCategory, useGetCategorySearchDetail, useGetPostsByCategory } from "../../hooks/query";
import { Category } from "@/domains/category/types";
import PostList from "@/common/post-list/PostList";
import { queryKey } from "@/common/hooks/post-card-hook";
import { RoundButton } from "@/components/Button";
import MainRecommendation from "../MainRecommendation";
import AuthorCardList from "../AuthorCardList";


type CategorySearchPanelProps = {
    category: Category
}

function CategorySearchPanel({category}: CategorySearchPanelProps){
    const {mutate: categorySubscription} = useCreateCategorySubscription()
    const {mutate: categorySubscriptionDelete}  = useCategorySubscriptionDelete()
    const {data: posts} = useGetPostsByCategory(category.id)
    const {data: categoryDetail} = useGetCategorySearchDetail(category.id)
    const {data: authors} = useGetAuthorsByCategory(category.id)

    if(!posts || !authors || !categoryDetail){
        return<>loading...</>
    }
    
    const handleFollowClick = () =>{
        if(categoryDetail.subscription.id){
            const data = {
                subscriptionId: categoryDetail.subscription.id,
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
                <Typography variant='body1' color='text.secondary'>Topic &middot; {categoryDetail.followerCount} followers</Typography>
                    <Button variant= {categoryDetail.subscription.id ? 'outlined': 'contained'} sx={{
                        padding: '0.5em 1em', 
                        borderRadius: '99em', 
                        width: 'fit-content',
                        justifySelf: 'center'}}
                        onClick={()=>handleFollowClick()}>{categoryDetail.subscription.id ? 'Following': 'Follow'}</Button>     
            </Stack>
            <Stack sx={{ gap: 8 }}>
                <Stack sx={{ gap: 2 }}>
                    {/* need to handle when there is no posts */}
                    <Typography variant='h4'>Recommended Posts</Typography>
                    <MainRecommendation posts={posts.pages[0].slice(0,4)} categoryId={category.id}/>  
                </Stack>
                <Stack sx={{ gap:2 }}>
                    <PostList posts={posts.pages[0].slice(4)} queryKey={queryKey.postsByCategory(category.id)}/>
                    <RoundButton text='See more recommended posts' onClick={()=>{}}/>
                </Stack> 
                <Stack sx={{ gap:2 }}>
                    <Typography variant='h4'>Our authors</Typography>
                    <AuthorCardList authors={authors.pages[0]}/>
                    <RoundButton text='See more authors' onClick={()=>{}}/>
                </Stack>        
            </Stack>
                     
        </>
    )
}

export default CategorySearchPanel;