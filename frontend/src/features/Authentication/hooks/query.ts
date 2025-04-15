import { server } from "@/utils/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SignUpFormProps } from "./sign-up-form"
import { useRouter } from "next/navigation"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useSnackbar } from "@/providers/SnackbarProvder"
import { LogInFormProps } from "./login-in-form"
import { LogIn, SignUp } from "./fetcher"


export const useLogInMutation = () => {
    const route = useRouter()
    const showSnackbar = useSnackbar()
    return useMutation({
        mutationFn: async(user: LogInFormProps)=>{
            return LogIn(user)
        },
        onSuccess: (response)=>{
            route.push(PagePath[Page.Home])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}

export const useSignUpMutation = () => {
    const route = useRouter()
    const showSnackbar = useSnackbar()
    return useMutation({
        mutationFn: async(user: SignUpFormProps)=>{
            return SignUp(user);
        },
        onSuccess: ()=>{
            route.push(PagePath[Page.Home])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}