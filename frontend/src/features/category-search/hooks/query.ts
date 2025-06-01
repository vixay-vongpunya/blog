import { getAuthorsByCategory, getCategorySeachDetail } from "@/api/category"
import { getPostsByCategory } from "@/api/post"
import { categorySubscription, deleteCategorySubscription } from "@/api/user"
import { getQueryClient } from "@/utils/query-client"
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"

const queryClient = getQueryClient()

export const useGetCategorySearchDetail = (categoryId: string) =>{
    return useQuery({
        queryKey: ['category-detail'],
        queryFn: ()=> getCategorySeachDetail(categoryId),
    })
}

export const useGetPostsByCategory = (categoryId: string) =>{
    return useInfiniteQuery({
        queryKey: ['posts-by-category'],
        queryFn: ({pageParam}: {pageParam: string | null})=> getPostsByCategory(categoryId, pageParam),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.length === 12 ? lastPage[12].id : null
    })
}

export const useGetAuthorsByCategory = (categoryId: string) =>{
    return useInfiniteQuery({
        queryKey: ['authors-by-category'],
        queryFn: ({pageParam}: {pageParam: string | null})=>getAuthorsByCategory(categoryId, pageParam),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.length === 12 ? lastPage[12].id : null

    })
}

export const useCreateCategorySubscription = () =>{
    return useMutation({
        mutationFn: async(categoryId: string)=>{
            return categorySubscription(categoryId)
        },
        onSuccess: ({categoryId, subscriptionId})=>{
            queryClient.setQueryData(['posts-by-category', categoryId], 
                (prev: any) => {
                    if (!prev) return prev
                    return {...prev, subscriptionId: subscriptionId}
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
            queryClient.setQueryData(['posts-by-category', categoryId], 
                (prev: any) => {
                    if (!prev) return prev
                    return {...prev, subscriptionId: null}
                }
            )
        }
    })
}