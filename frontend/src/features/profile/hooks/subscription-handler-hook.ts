import { useDeleteUserSubscriptionMutation, useUserSubscriptionMutation } from "@/utils/hooks/user/query"


export const useSubscriptionHandler = () => {
    const {mutate: userSubscriptionMutate} = useUserSubscriptionMutation()
    const {mutate: deleteUserSubscriptionMutate} = useDeleteUserSubscriptionMutation()

    //userName will be used to invalidate cached account data
    const handleSubscribe = (authorId: string, userName: string) =>{
        const data = {
            authorId: authorId,
            userName: userName
        }
        userSubscriptionMutate(data)
       
    }

    const handleUnSubscribe = (subscriptionId: string | undefined, authorId: string, userNam: string) => {
        // since subscription can be null so need to handle here
        if(!subscriptionId) return
        const data = {
            subscriptionId: subscriptionId,
            authorId: authorId,
            userName: userNam  
        }

        deleteUserSubscriptionMutate(data)
        
    }
    
    return{
        handleSubscribe: handleSubscribe,
        handleUnSubscribe: handleUnSubscribe
    }
    
}