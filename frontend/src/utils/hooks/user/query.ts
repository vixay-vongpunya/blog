import { createUserSubscription, getSelf} from "@/api/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getQueryClient } from "../../query-client"

const queryClient = getQueryClient()

export const useGetSelfQuery = () => {
    return useQuery({
        queryKey:['get-self'],
        queryFn: async()=>{
            return getSelf()
        },
        enabled: true,
    })
}

export const useUserSubscriptionMutation = () => {    
    return useMutation({
        mutationFn: async(authorId:string)=>{
            return createUserSubscription(authorId)
        },
        onSuccess: (response, authorId) => {
            queryClient.setQueryData(['userSubscription', authorId],
                () => ({
                    subscription:{id: response.id}
                })
            )
        }
    })
}
