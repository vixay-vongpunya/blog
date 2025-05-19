import { postDelete, postSave } from "@/api/user"
import { useMutation } from "@tanstack/react-query"
import { getQueryClient } from "../query-client"
import { Post } from "@/domains/post/types"

const queryClient = getQueryClient()

export const useCreateSavePostMutation = () => {
    return useMutation({
        mutationFn: async(postId: string) => {
            return postSave(postId)
        },
        onSuccess: async(response) =>{
            console.log("here", response)
            const state = queryClient.setQueryData(['all-posts'], 
                (posts: Post[] | undefined) => {
                    if (!posts) return posts
                    return posts.map(item=>{
                        if(item.id === response.postId){
                            return {...item, savedPost: {id: response.id}}
                        }
                        return item
                    })
                }
            )
            console.log(state)
        }
    })
}

export const useDeleteSavePostMutation = () => {
    return useMutation({
        mutationFn: async(id: string) => {
            return postDelete(id)
        },
        onSuccess: async(response) =>{
            console.log("here", response)
            const state = queryClient.setQueryData(['all-posts'], 
                (posts: Post[] | undefined) => {
                    if (!posts) return posts
                    return posts.map(item=>{
                        if(item.id === response.postId){
                            return {...item, savedPost: null}
                        }
                        return item
                    })
                }
            )
            console.log(state)
        }
    })
}