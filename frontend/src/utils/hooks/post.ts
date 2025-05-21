import { postDelete, postSave } from "@/api/user"
import { useMutation } from "@tanstack/react-query"
import { getQueryClient } from "../query-client"

const queryClient = getQueryClient()

export const useCreateSavePostMutation = () => {
    return useMutation({
        mutationFn: async(data:any) => {
            return postSave(data.postId)
        },
        onSuccess: async(response, {queryKey}) =>{
            queryClient.setQueryData(queryKey, 
                (prev:any) => {
                    if (!prev) return prev
                    const posts = prev.posts.map((item: any)=>{
                        if(item.id === response.postId){
                            return {...item, savedPost: {id: response.id}}
                        }
                        return item
                    })

                    return{...prev, posts}
                }
            )
        }
    })
}

export const useDeleteSavePostMutation = () => {
    return useMutation({
        mutationFn: async(data:any ) => {
            return postDelete(data.id)
        },
        onSuccess: async(response, {queryKey}) =>{
            queryClient.setQueryData(queryKey, 
                (prev:any) => {
                    if (!prev) return prev
                    const posts = prev.posts.map((item: any)=>{
                        if(item.id === response.postId){
                            return {...item, savedPost: null}
                        }
                        return item
                    })

                    return{...prev, posts}
                }
            )
        }
    })
}