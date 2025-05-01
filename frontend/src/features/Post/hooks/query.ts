
import { createComment, getPostById } from "@/api/post"
import { CommentCreate } from "@/domains/comment/types"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetPostQuery = (postId: string)=>{
    return useQuery({
        queryKey: ["post", {postId}],
        queryFn: async()=>{
            return await getPostById(postId)
        }
    })
}

export const useCreateCommentMutation = ()=>{
    return useMutation({
        mutationFn: async(data: CommentCreate)=>{
            return createComment(data)
        }
    })
}