import { server } from "@/utils/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SignUpFormProps } from "./sign-up-form"
import { useRouter } from "next/navigation"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useSnackbar } from "@/providers/SnackbarProvder"
import { LogInForm } from "./login-in-form"
import { getSelf, LogIn, LogOut, SignUp } from "../../../api/user"
import { useAuth, User } from "@/providers/AuthProvider"

export const useGetSelf = () => {
    return useQuery({
        queryKey:['getSelf'],
        queryFn: async()=>{
            return getSelf()
        },
        enabled: true,
        retry: false
    })
}

export const useLogInMutation = () => {
    const router = useRouter()
    const showSnackbar = useSnackbar()
    const { login } = useAuth()
    return useMutation({
        mutationFn: async(user: LogInForm)=>{
            return LogIn(user)
        },
        onSuccess: (response)=>{
            console.log(getSelf())
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
    const showSnackbar = useSnackbar()
    const { logout } = useAuth()
    return useMutation({
        mutationFn: async()=>{
            return LogOut();
        },
        onSuccess: (response)=>{
            logout()
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}