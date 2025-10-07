import { Post } from "@/domains/post/types"
import { UserSubscriptionFollowing } from "@/domains/subscription/types"
import { Account, UserId } from "@/domains/user/types"
import { server } from "@/utils/axios"

//user
export const getPostsByAuthor = async(authorId: UserId, cursor: string | undefined): Promise<Post[]> =>{
    try{
        const response = await server.get(`/users/${authorId}/posts?cursor=${cursor}`)
        return response.data
    }
    catch(error){
        throw error
    }
} 

export const getAccount = async(userName: string): Promise<Account> =>{
    try{
        const response = await server.get(`/users/${userName}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const updateUser = async(user: FormData) => {
    try{
        const response = await server.put('/users', user)
        return response.data
    }
    catch(error){
        throw error
    }
}

// subscription
// check if user is already subscribed
export const getUserSubscription = async(authorId: UserId): Promise<{subscription:{id: string} | null}> => {
    try{
        const response = await server.get(`/subscriptions/users/${authorId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getUserSubscriptionFollowing = async(authorId: UserId, cursor: string | undefined): Promise<UserSubscriptionFollowing[]> => {
    try{
        const response = await server.get(`/subscriptions/users/${authorId}/following?cursor=${cursor}`)
        console.log("following list", response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}

//posts
export const getMyPosts = async(): Promise<Post[]> => {
    try{
        const response = await server.get('users/self/posts')
        return response.data
    }
    catch(error){
        throw error
    }
}

