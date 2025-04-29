import { server } from "@/utils/axios"
import { SignUpFormProps } from "../../features/authentication/hooks/sign-up-form"
import { LogInForm } from "../../features/authentication/hooks/login-in-form"

export type User = {
    id: string,
    name: string,
    email: string,
    updated: string,
    created: string
} 

export const getSelf = async()=>{
    try{
        const response = await server.get('/user/self')
        console.log("here", response)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const SignUp = async(user: SignUpFormProps)=>{
    try{
        const response = await server.post('/user/sign-up', user)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const LogIn = async(user: LogInForm)=>{
    try{
        const response = await server.post('/user/log-in', user)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const LogOut = async()=>{
    try{
        const response = await server.post('/user/log-out')
        console.log(response)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getMyPosts = async() => {
    try{
        const response = await server.get('/user/posts')
        return response.data
    }
    catch(error){
        throw error
    }
}

export const userSubscription = async(authorId: string) => {
    try{
        const response = await server.post('/user/user-user-subscription', {authorId: authorId})
        console.log(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const categorySubscription = async(categoryId: string) => {
    try{
        const response = await server.post('/user/user-category-subscription', {categoryId: categoryId})
        return response.data
    }
    catch(error){
        throw error
    }
}