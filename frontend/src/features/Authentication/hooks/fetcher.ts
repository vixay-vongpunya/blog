import { User, UserAuth, UserSignUp } from "@/domains/user/types"
import { server } from "@/utils/axios"


export const LogIn = async(user: UserAuth):Promise<User>=>{
    try{
        const response = await server.post('/users/log-in', user)
        return response.data
    }
    catch(error: any){
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

export const LogOut = async() => {
    try{
        const response = await server.post('/users/log-out')
        console.log("log-in response", response)
        return response.data
    }
    catch(error){
        throw error
    }
}