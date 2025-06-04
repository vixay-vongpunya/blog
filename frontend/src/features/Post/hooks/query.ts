import { createComment, getCommentsByPost, getPostById } from "./fetcher"
import { CommentCreate } from "@/domains/comment/types"
import { getQueryClient } from "@/utils/query-client"
import { useMutation, useQuery } from "@tanstack/react-query"

const queryClient = getQueryClient()

export const useGetPostQuery = (postId: string)=>{
    return useQuery({
        queryKey: ['post', {postId}],
        queryFn: async()=>{
            return await getPostById(postId)
        }
    })
}

export const useGetCommentsQuery = (postId: string)=>{
    return useQuery({
        queryKey: ['post-comments', {postId}],
        queryFn: async()=>{
            return await getCommentsByPost(postId)
        }
    })
}

export const useCreateCommentMutation = (postId:string)=>{
    return useMutation({
        mutationKey: ['post-comments', {postId}],
        mutationFn: async(data: CommentCreate)=>{
            return createComment(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['post-comments', {postId}
                ]}
            )
        }
    })
}