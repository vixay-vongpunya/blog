'use client'
import {  Button, Stack, Typography } from "@mui/material";
import SearchResultContent from "../SearchResultContent";
import { useGetPostsByCategory } from "../../hooks/query";
import { useData } from "@/providers/DataProvider";
import { useCategorySubscription } from "@/utils/globalQuery";


function CategorySearchPanel({categoryName}:{categoryName: string}){
    const {categories} = useData()
    const category = categories.find(item=>item.name === categoryName)
    const {mutate: categorySubscription} = useCategorySubscription()
    if(!category){
        return<>loading...</>
    }
    const {data: posts, isLoading} = useGetPostsByCategory(category.id)
    return(
        <>
            <Stack sx={{ marginX: 'auto', marginBottom: '5em', alignItems: 'center', gap:2 }}>
                <Typography variant='h2' textAlign='center'>{categoryName}</Typography>
                <Typography variant='body1' color='text.secondary'>44k followers &middot; 1.1k following</Typography>
                    <Button variant='contained' sx={{
                        padding: '0.5em 1em', 
                        borderRadius: '99em', 
                        width: 'fit-content',
                        justifySelf: 'center'}}
                        onClick={()=>categorySubscription(category.id)}>Follow</Button>     
            </Stack>
              {!isLoading &&  <SearchResultContent posts={posts}/>}               
        </>
    )
}

export default CategorySearchPanel;