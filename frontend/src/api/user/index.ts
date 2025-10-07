import { server } from "@/utils/axios"
import { User, UserId, UserSignUp } from "@/domains/user/types"
import { Post, PostId } from "@/domains/post/types"


export const getSelf = async():Promise<User>=>{
    try{
        const response = await server.get('/users/self')
        console.log("here", response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const createUserSubscription = async(authorId: UserId) => {
    try{
        const response = await server.post('/subscriptions/users', {authorId: authorId})
        console.log(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const createSavedPost = async(postId: PostId) =>{
    try{
        const response = await server.post('/users/saved-posts', {postId: postId})
        return response.data
    }
    catch(error){
        throw error
    }
}

export const deleteSavedPost = async(id: string) =>{
    try{
        const response = await server.delete(`/users/saved-posts/${id}`)
        return response.data
    }
    catch(error){
        throw error
    }
}



//g
export const deleteUserSubscription = async(subscriptionId: string) => {
    try{
        const response = await server.delete(`/subscriptions/${subscriptionId}/users`)
        return response.data
    }
    catch(error){
        throw error
    }
}
// export const getUserSubscription = async() => {
//     try{
//         const response = await server.get('/users/user-user-subscription')
//         console.log(response.data)
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }

// export const getCategorySubscription = async() => {
//     try{
//         const response = await server.get('/users/user-category-subscription')
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }