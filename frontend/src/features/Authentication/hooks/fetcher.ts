import { server } from "@/utils/axios"
import { SignUpFormValues } from "./sign-up-form"


export const SignUp = async(user: SignUpFormValues)=>{
    try{
        const response = await server.post('/sign-up', user)
        return response.data
    }
    catch(error){
        throw error
    }
    
}