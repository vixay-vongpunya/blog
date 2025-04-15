import { server } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { SignUpFormValues } from "./sign-up-form"
import { SignUp } from "./fetcher"


export const useSignUpQuery = (user: SignUpFormValues) => {
    return useQuery({
        queryKey: ['sign-up'],
        queryFn: async()=>{
            return SignUp(user)
        }
    })
}