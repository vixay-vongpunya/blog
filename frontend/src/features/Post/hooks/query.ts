import { CreateComment, createComment, getPost } from "@/api/post"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetPostQuery = (postId: string)=>{
    return useQuery({
        queryKey: ["blog"],
        queryFn: async()=>{
            return await getPost(postId)
        }
    })
}

export const useCreateCommentMutation = ()=>{
    return useMutation({
        mutationFn: async(data: CreateComment)=>{
            return createComment(data)
        }
    })
}