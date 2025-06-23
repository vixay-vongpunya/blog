import { createUserSubscription, deleteUserSubscription, getSelf} from "@/api/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getQueryClient } from "../../query-client"

const queryClient = getQueryClient()

export const useGetSelfQuery = () => {
    return useQuery({
        queryKey:['get-self'],
        queryFn: async()=>{
            return getSelf()
        },
        retry: false,
        enabled: true,
    })
}

export const useUserSubscriptionMutation = () => {    
    return useMutation({
        mutationFn: ({authorId, userName}: {authorId: string, userName: string})=> createUserSubscription(authorId),
        onSuccess: (response, {authorId, userName}) => {
           // wont be accountable for db changing(other users also click), 
           // for current user experience
            queryClient.setQueryData(['account', userName],
                (prev: any) => {
                    console.log("prev", prev)
                    if(!prev) return
                    return {
                        ...prev,
                        subscription: {
                            ...prev.subscription,
                            followerCount: prev.subscription.followerCount+1
                        }
                    }
                }
            )

            queryClient.setQueryData(['user-subscription', authorId],
                (prev:any)=>{
                    if(!prev) return
                    return {
                        ...prev,
                        subscription:{
                            id: response.id
                        }
                    }
                })
        }
    })
}

export const useDeleteUserSubscriptionMutation = () => {
    return useMutation({
        mutationFn: async({subscriptionId, authorId, userName}: {subscriptionId: string, authorId: string, userName:string})=>{
            return deleteUserSubscription(subscriptionId)
        },
        onSuccess: (_, {authorId, userName}) => {
            queryClient.setQueryData(['user-subscription', authorId],
                (prev:any) => {
                    if(!prev) return
                    return {
                        subscription:{
                            id:null
                        }
                    }
                }
            )

            queryClient.setQueryData(['account', userName],
                (prev: any) => {
                    if(!prev) return
                    return {
                        ...prev,
                        subscription: {
                            ...prev.subscription,
                            followerCount: prev.subscription.followerCount-1
                        }
                    }
                }
            )
        }
    })
}
