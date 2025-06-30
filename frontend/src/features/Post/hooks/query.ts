import { createSavedPost, deleteSavedPost } from "@/api/user"
import { createComment, getCommentReplies, getCommentsByPost, getCommentsByPostTotalCount, getPostById, getRelatedPostsByPost } from "./fetcher"
import { CommentCreate } from "@/domains/comment/types"
import { getQueryClient } from "@/utils/query-client"
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"

const queryClient = getQueryClient()

export const useGetPostQuery = (postId: string)=>{
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId)
    })
}

export const useGetRelatedPostsQuery = (postId: string, take: number = 12)=>{
    return useInfiniteQuery({
        queryKey: ['related-posts', postId],
        queryFn: ({pageParam}: {pageParam: string | undefined}) => getRelatedPostsByPost(postId, pageParam, take),            
        initialPageParam: undefined,
        //need condition for stopping
        getNextPageParam: (lastPage, pages) => lastPage.length === take ? lastPage[take-1].id : undefined
    })
}


export const setPostQueryData = () => {
    const setQueryData = (postId: string) => queryClient.invalidateQueries({queryKey: ['post', postId]})
    return{
        setQueryData: setQueryData
    }
}

export const useGetCommentsTotalCountQuery = (postId: string)=>{
    return useQuery({
        queryKey: ['post-comments-count', postId],
        queryFn: () => getCommentsByPostTotalCount(postId)
    })
}

export const useGetCommentsQuery = (postId: string, take: number = 6)=>{
    return useInfiniteQuery({
        queryKey: ['post-comments', postId],
        queryFn: ({pageParam}: {pageParam: string | undefined}) => getCommentsByPost(postId, pageParam, take),            
        initialPageParam: undefined,
        //need condition for stopping
        getNextPageParam: (lastPage, pages) => lastPage.length === take ? lastPage[take-1].id : undefined
    })
}

export const useGetCommentRepliesQuery = (commentId: string, take: number = 12)=>{
    return useInfiniteQuery({
        queryKey: ['comment-replies', commentId],
        queryFn: ({pageParam}: {pageParam: string | undefined}) => getCommentReplies(commentId, pageParam),            
        initialPageParam: undefined,
        //need condition for stopping
        getNextPageParam: (lastPage, pages) => lastPage.length === take ? lastPage[take-1].id : undefined,
    })
}

export const useCreateCommentMutation = (queryKey: readonly unknown[])=>{
    return useMutation({
        mutationFn: (data: CommentCreate) => createComment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKey
                }
            )
        }
    })
}

export const useCreateSavePostMutation = () => {
    return useMutation({
        mutationFn: (postId: string) =>  createSavedPost(postId),
    })
}

export const useDeleteSavePostMutation = () => {
    return useMutation({
        mutationFn: (id: string) => deleteSavedPost(id),
    })
}
