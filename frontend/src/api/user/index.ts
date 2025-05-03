import { server } from "@/utils/axios"
import { User, UserAuth, UserId, UserSignUp } from "@/domains/user/types"
import { Post } from "@/domains/post/types"
import { CategoryId } from "@/domains/category/types"


export const getSelf = async():Promise<User>=>{
    try{
        const response = await server.get('/users/self')
        console.log("here", response)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const SignUp = async(user: UserSignUp):Promise<User>=>{
    try{
        const response = await server.post('/users/sign-up', user)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const LogIn = async(user: UserAuth):Promise<User>=>{
    try{
        const response = await server.post('/users/log-in', user)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const LogOut = async() => {
    try{
        const response = await server.post('/users/log-out')
        console.log(response)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getMyPosts = async(): Promise<Post[]> => {
    try{
        const response = await server.get('users/self/posts')
        return response.data
    }
    catch(error){
        throw error
    }
}

export const userSubscription = async(authorId: UserId) => {
    try{
        const response = await server.post('/users/users/subscriptions', {authorId: authorId})
        console.log(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const categorySubscription = async(categoryId: CategoryId) => {
    try{
        const response = await server.post('/users/categories/subscriptions', {categoryId: categoryId})
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getSelfSubscription = async() => {
    try{
        const response = await server.get('/users/self/subscriptions')
        console.log("subscription", response.data)
        //data needed here might be only categoryId and Id. need to change backend returns

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