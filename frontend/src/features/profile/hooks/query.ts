import { fetchPosts } from "@/api/post"
import { useAuth } from "@/providers/AuthProvider"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useSnackbar } from "@/providers/SnackbarProvder"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useGetPostsQuery = () => {    
    return useQuery({
        queryKey: ['fetchPost'],
        queryFn: async()=>{
            return fetchPosts();
        }
    })
}