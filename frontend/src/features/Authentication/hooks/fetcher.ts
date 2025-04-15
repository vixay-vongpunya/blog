import { server } from "@/utils/axios"
import { SignUpFormProps } from "./sign-up-form"
import { LogInFormProps } from "./login-in-form"


export const SignUp = async(user: SignUpFormProps)=>{
    try{
        const response = await server.post('/user/sign-up', user)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const LogIn = async(user: LogInFormProps)=>{
    try{
        console.log("herer")
        const response = await server.post('/user/login', user)
        return response.data
    }
    catch(error){
        throw error
    }
}