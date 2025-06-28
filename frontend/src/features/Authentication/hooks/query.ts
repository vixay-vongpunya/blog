import { useMutation} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useSnackbar } from "@/providers/SnackbarProvder"
import { LogIn, LogOut, SignUp } from "./fetcher"
import { UserAuth, UserSignUp } from "@/domains/user/types"
import { getQueryClient } from "@/utils/query-client"
// import { useAuth, User } from "@/providers/AuthProvider"

const queryClient = getQueryClient()

export const useLogInMutation = () => {
    const router = useRouter()
    const showSnackbar = useSnackbar()
    // const { login } = useAuth()
    return useMutation({
        mutationFn: async(user: UserAuth)=>{
            return LogIn(user)
        },
        onSuccess: async(response)=>{
            // login(response)
            router.push(`${PagePath[Page.Home]}?source=feed`)
            queryClient.invalidateQueries({
                queryKey:[ 'get-self']
            })
        },
        onError: (error: any)=>{
            showSnackbar(error.response.data)
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
            queryClient.invalidateQueries({
                queryKey:[ 'get-self']
            })
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
            router.push(PagePath[Page.Login])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }

    })
}