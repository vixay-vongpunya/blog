import { Post } from "@/domains/post/types"
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
        console.log('fetcged')
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
export const getUserSubscription = async(authorId: UserId) => {
    try{
        const response = await server.get(`/users/users/subscriptions/${authorId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getUserSubscriptionFollowing = async(authorId: UserId, cursor: string | undefined) => {
    try{
        const response = await server.get(`/users/${authorId}/users/subscriptions/following?cursor=${cursor}`)
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

