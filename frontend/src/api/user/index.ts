import { server } from "@/utils/axios"
import { SignUpFormProps } from "../../features/authentication/hooks/sign-up-form"
import { LogInForm } from "../../features/authentication/hooks/login-in-form"

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
        console.log(response.data)
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