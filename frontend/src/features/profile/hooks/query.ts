
import { useSnackbar } from "@/providers/SnackbarProvder"
import { getQueryClient } from "@/utils/query-client"
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { getAccount, getPostsByAuthor, getUserSubscription, getUserSubscriptionFollowing, updateUser } from "./fetcher"
import { deleteUserSubscription } from "@/api/user"

const queryClient = getQueryClient()

export const useGetAccount = (userName: string) => {
    return useQuery({
        queryKey:['account'],
        queryFn: async()=>{
            return getAccount(userName)
        },
    })
}

export const useGetUserSubscriptionFollowingQuery = (authorId: string | undefined) => {
    // i dont want authorId passed to api typed as undefined so i check early and avoid enabled since that is redundent
    return useInfiniteQuery({
        queryKey:['user-following'],
        queryFn: ({pageParam}: {pageParam: string | undefined})=> {
            // just save guard the api type never actually run because what controlls is enabled
            if(!authorId) throw Error("user not found")
            return getUserSubscriptionFollowing(authorId, pageParam)
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage, pages) => lastPage.length === 12 ? lastPage[lastPage.length-1].id : undefined,
        enabled: !!authorId

    })
}

export const useGetUserSubscriptionQuery = (authorId: string | undefined, enabled: boolean) => {
    return useQuery({
        queryKey:['user-subscription'],
        queryFn: async()=>{
            if(!authorId) throw Error("user not found")
            return getUserSubscription(authorId)
        },
        enabled: enabled || !!authorId

    })
}

export const useGetPostsByAuthorQuery = (authorId: string | undefined) => {
    return useInfiniteQuery({   
        queryKey: ['author-posts'],
        queryFn: ({pageParam}: {pageParam: string | undefined})=> {
            if(!authorId) throw Error("user not found")
            return getPostsByAuthor(authorId, pageParam)
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage, pages) => lastPage?.length === 12 ? lastPage[lastPage.length-1].id : undefined,
        enabled: !!authorId
    })
}

export const useDeleteUserSubscriptionMutation = () => {
    return useMutation({
        mutationFn: async({subscriptionId, authorId}: {subscriptionId: string, authorId: string})=>{
            return deleteUserSubscription(subscriptionId)
        },
        onSuccess: (_, {authorId}) => {
            queryClient.setQueryData(['user-subscription', authorId],
                () => ({
                    subscription:{id:null}
                })
            )
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