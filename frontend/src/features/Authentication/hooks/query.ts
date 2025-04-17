import { server } from "@/utils/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SignUpFormProps } from "./sign-up-form"
import { useRouter } from "next/navigation"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useSnackbar } from "@/providers/SnackbarProvder"
import { LogInFormProps } from "./login-in-form"
import { LogIn, SignUp } from "./fetcher"
import { useAuth } from "@/providers/AuthProvider"


export const useLogInMutation = () => {
    const router = useRouter()
    const showSnackbar = useSnackbar()
    const { login } = useAuth()
    return useMutation({
        mutationFn: async(user: LogInFormProps)=>{
            return LogIn(user)
        },
        onSuccess: (response)=>{
            login(response)
            router.push(PagePath[Page.Home])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}

export const useSignUpMutation = () => {
    const router = useRouter()
    const showSnackbar = useSnackbar()
    const { login } = useAuth()
    return useMutation({
        mutationFn: async(user: SignUpFormProps)=>{
            return SignUp(user);
        },
        onSuccess: (response)=>{
            login(response)
            router.push(PagePath[Page.Home])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}

export const useLogOutMutation = () => {
    const router = useRouter()
    const showSnackbar = useSnackbar()
    const { logout } = useAuth()
    return useMutation({
        mutationFn: async(user: SignUpFormProps)=>{
            return SignUp(user);
        },
        onSuccess: (response)=>{
            logout()
            router.push(PagePath[Page.Login])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}