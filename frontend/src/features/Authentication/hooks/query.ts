import { useMutation, useQuery } from "@tanstack/react-query"
import { SignUpFormProps } from "./sign-up-form"
import { useRouter } from "next/navigation"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useSnackbar } from "@/providers/SnackbarProvder"
import { LogInForm } from "./login-in-form"
import { getSelf, LogIn, LogOut, SignUp } from "../../../api/user"
import { UserAuth, UserSignUp } from "@/domains/user/types"
// import { useAuth, User } from "@/providers/AuthProvider"

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
    // const { login } = useAuth()
    return useMutation({
        mutationFn: async(user: UserAuth)=>{
            return LogIn(user)
        },
        onSuccess: (response)=>{
            // login(response)
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
    // const { login } = useAuth()
    return useMutation({
        mutationFn: async(user: UserSignUp)=>{
            return SignUp(user);
        },
        onSuccess: (response)=>{
            // login(response)
            router.push(PagePath[Page.Home])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}

export const useLogOutMutation = () => {
    const showSnackbar = useSnackbar()
    const router = useRouter()
    return useMutation({
        mutationFn: async()=>{
            return LogOut();
        },
        onSuccess: (response)=>{
            document.cookie = 'auth-token=; Max-Age=0' 
            router.push(PagePath[Page.Login])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}