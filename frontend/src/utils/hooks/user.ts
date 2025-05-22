import { userSubscription } from "@/api/user"
import { useMutation } from "@tanstack/react-query"

export const useUserSubscriptionMutation = () => {    
    return useMutation({
        mutationFn: async(authorId:string)=>{
            return userSubscription(authorId)
        }
    })
}