import { getQueryClient } from "@/utils/query-client"
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { categorySubscription, deleteCategorySubscription, getAuthorsByCategory, getCategorySeachDetail, getPostsByCategory } from "./fetcher"

const queryClient = getQueryClient()

export const useGetCategorySearchDetail = (categoryId: string) =>{
    return useQuery({
        queryKey: ['category-detail', categoryId],
        queryFn: ()=> getCategorySeachDetail(categoryId),
    })
}

export const useGetPostsByCategory = (categoryId: string) =>{
    return useInfiniteQuery({
        queryKey: ['posts-by-category', categoryId],
        queryFn: ({pageParam}: {pageParam: string | undefined})=> getPostsByCategory(categoryId, pageParam),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.length === 12 ? lastPage[11].id : undefined
    })
}

export const useGetAuthorsByCategory = (categoryId: string) =>{
    return useInfiniteQuery({
        queryKey: ['authors-by-category', categoryId],
        queryFn: ({pageParam}: {pageParam: string | null})=>getAuthorsByCategory(categoryId, pageParam),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.length === 12 ? lastPage[11].id : null

    })
}

export const useCreateCategorySubscription = () =>{
    return useMutation({
        mutationFn: async(categoryId: string)=>{
            return categorySubscription(categoryId)
        },
        onSuccess: (response, categoryId)=>{
            queryClient.setQueryData(['category-detail', categoryId], 
                (prev: any) => {
                    if (!prev) return prev
                    console.log(prev)
                    return {...prev, subscription: {id: response.subscriptionId}}
                }
            )
        }
    })
}

type CategorySubscriptionDelete = {
    subscriptionId: string;
    categoryId: string
}

export const useCategorySubscriptionDelete = () =>{
    return useMutation({
        //this key is duplicated
        mutationFn: async(data: CategorySubscriptionDelete)=>{
            return deleteCategorySubscription(data.subscriptionId)
        },
        // to access argument in mutationFn access by varaibles like below
        onSuccess: ( _, {categoryId})=>{
            queryClient.setQueryData(['category-detail', categoryId], 
                (prev: any) => {
                    if (!prev) return prev
                    return {...prev, subscription: {id: undefined}}
                }
            )
        }
    })
}