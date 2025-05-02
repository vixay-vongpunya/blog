import { createPost } from "@/api/post"
import { useSnackbar } from "@/providers/SnackbarProvder"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useCreatePost = () => {    
    const router = useRouter()
    const showSnackbar = useSnackbar()
    return useMutation({
        mutationFn: async(data:any)=>{
            return createPost(data);
        },
        onSuccess: (response)=>{
            // maybe i should move this to hook
            // router.push(PagePath[Page.Home])
        },
        onError: (error)=>{
            showSnackbar(error.message)
        }
    })
}