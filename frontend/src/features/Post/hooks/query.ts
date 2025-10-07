import { createSavedPost, deleteSavedPost } from "@/api/user"
import { createComment, getCommentReplies, getCommentsByPost, getCommentsByPostTotalCount, getPostById, getRelatedPostsByPost } from "./fetcher"
import { CommentCreate } from "@/domains/comment/types"
import { getQueryClient } from "@/utils/query-client"
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { commentQueryKey } from "../components/Comment/CommentInput"

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

export const useCreateCommentMutation = (pageNumber: number, queryKey: readonly unknown[])=>{
    return useMutation({
        mutationFn: (data: CommentCreate) => createComment(data),
        onSuccess: async ( response, {grandParentId, parentId, postId}) => {
            console.log(queryKey)
            const state = queryClient.getQueryState(queryKey)
            console.log("state", state)
            
                if(state){
                    //for replying to post and to comments that has cached replies just revalidate
                    //since this action is not freqquent
                    queryClient.invalidateQueries({queryKey: queryKey})
                    // if the cache of that queryKey doesnt exist it does nothing, so i handle in else
                    // queryClient.setQueryData(queryKey, 
                    //     (prev: any) => {
                    //         if(!prev) return prev

                    //         return({
                    //             ...prev,
                    //             pages: prev.pages[pageNumber].map((page:any, index: number)=>{
                    //                 if(prev.pages.length-1 === index){
                    //                     if(page.length === 12){
                    //                         return {
                    //                             ...page,
                    //                             response
                    //                         }
                    //                     }
                    //                     else{
                    //                         page.push(response)
                    //                         return page
                    //                     }
                    //                 }
                    //             }
                                    

                    //             )
                    //         })
                    //     } 
                    // )
                }
                else{
                    //let comment from post know that it has a reply   
                    console.log(commentQueryKey.postComments(postId))
                    if(!grandParentId){
                        const data = queryClient.setQueryData(commentQueryKey.postComments(postId), 
                        (prev: any) => {
                            if(!prev) return prev
                            const newPages = [...prev.pages]

                            newPages[pageNumber] = newPages[pageNumber].map((item: any) => {
                                        if(item.id === parentId){
                                            return{
                                                ...item,
                                                replyCount: 1
                                            }
                                        }
                                        return item
                                    }
                                )

                            return {
                                ...prev,
                                pages: newPages
                            }
                        }) 
                    }
                    else{
                        if(grandParentId === parentId) {

                        }
                        else{
                            
                        }
                        console.log("grand", grandParentId, "parent", parentId)
                        queryClient.invalidateQueries({queryKey: commentQueryKey.commentReplies(grandParentId as string)})
                        const response = await getCommentReplies(parentId as string, undefined)
                        console.log("response", response)
                        const datad = queryClient.setQueryData(queryKey, {
                            pageParams: [undefined],
                            pages: [response]
                        }) 
                        console.log(datad)
                    }

                    //when the replies cache for a comment doesnt exist yet
                    queryClient.invalidateQueries({queryKey: queryKey})
            }
           
      
            
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
