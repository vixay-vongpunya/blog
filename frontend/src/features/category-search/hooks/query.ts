import { getPostsByCategory } from "@/api/post"
import { categorySubscription, deleteCategorySubscription } from "@/api/user"
import { getQueryClient } from "@/utils/query-client"
import { useMutation, useQuery } from "@tanstack/react-query"

const queryClient = getQueryClient()

export const useGetPostsByCategory = (categoryId: string) =>{
    return useQuery({
        queryKey: ['posts-by-category', categoryId],
        queryFn: async()=>{
            const response = await getPostsByCategory(categoryId)
            return{
                pages: [response.posts],
                followers: response.followers,
                subscriptionId: response.subscriptionId,
                authors: response.authors
            }
        }
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