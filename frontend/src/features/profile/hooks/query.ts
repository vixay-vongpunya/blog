
import { getMyPosts, getAccount, getUserSubscription, deleteUserSubscription, updateUser } from "@/api/user"
import { User } from "@/domains/user/types"
import { useSnackbar } from "@/providers/SnackbarProvder"
import { getQueryClient } from "@/utils/query-client"
import { useMutation, useQuery } from "@tanstack/react-query"

const queryClient = getQueryClient()

export const useGetAccount = (userId: string) => {
    return useQuery({
        queryKey:['account', userId],
        queryFn: async()=>{
            return getAccount(userId)
        },
    })
}

export const useGetUserSubscriptionQuery = (authorId: string, enabled: boolean) => {
    return useQuery({
        queryKey:['userSubscription', authorId],
        queryFn: async()=>{
            return getUserSubscription(authorId)
        },
        enabled: enabled
    })
}

export const useDeleteUserSubscriptionMutation = () => {
    return useMutation({
        mutationFn: async({subscriptionId, authorId}: {subscriptionId: string, authorId: string})=>{
            return deleteUserSubscription(subscriptionId)
        },
        onSuccess: (_, {authorId}) => {
            queryClient.setQueryData(['userSubscription', authorId],
                () => ({
                    subscription:{id:null}
                })
            )
        }
    })
}

export const useGetMyPostsQuery = () => {    
    return useQuery({
        queryKey: ['fetchPost'],
        queryFn: async()=>{
            return getMyPosts()
        }
    })
}

export const useAccountUpdateMutation = () => {
    const showSnackbar = useSnackbar()
    return useMutation({
        mutationFn: (data: FormData) => updateUser(data),
        onSuccess: (response) => {
            queryClient.setQueryData(['get-self'],(prev: any)=>({...prev, ...response}))
            showSnackbar('user updated')
        }
    })
}