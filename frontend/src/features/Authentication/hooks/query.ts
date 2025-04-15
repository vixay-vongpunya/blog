import { server } from "@/utils/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SignUpFormProps } from "./sign-up-form"
import { SignUp } from "./fetcher"
import { useRouter } from "next/navigation"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useSnackbar } from "@/providers/SnackbarProvder"


export const useSignUpMutation = () => {
    const route = useRouter()
    const showSnackbar = useSnackbar()
    return useMutation({
        mutationFn: async(user: SignUpFormProps)=>{
            throw new Error("Simulated error: failed to sign up");
        },
        onSuccess: ()=>{
            route.push(PagePath[Page.Home])
        },
        onError: (error)=>{
            console.log(error)
            showSnackbar(error.message)
        }

    })
}