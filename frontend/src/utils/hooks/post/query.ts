import { createSavedPost, deleteSavedPost } from "@/api/user"
import { getQueryClient } from "@/utils/query-client"
import { useMutation } from "@tanstack/react-query"

const queryClient = getQueryClient()

export const useCreateSavePostMutation = () => {
    return useMutation({
        mutationFn: async(data:any) => {
            return createSavedPost(data.postId)
        },
        onSuccess: async(response, {pageNumber, queryKey}) =>{
            queryClient.setQueryData(queryKey, 
                (prev:any) => {
                    if (!prev) return prev
                    const pages = prev.pages[pageNumber].map((item: any)=>{
                        if(item.id === response.postId){
                            return {...item, savedPosts: {id: response.id}}
                        }
                        return item
                    })
                    return{...prev, pages: [pages]}
                }
            )
        }
    })
}

export const useDeleteSavePostMutation = () => {
    return useMutation({
        mutationFn: async(data: any) => {
            return deleteSavedPost(data.id)
        },
        onSuccess: async(response, {pageNumber, queryKey}) =>{
            queryClient.setQueryData(queryKey, 
                (prev:any) => {
                    if (!prev) return prev
                    const pages = prev.pages[pageNumber].map((item: any)=>{
                        if(item.id === response.postId){
                            return {...item, savedPosts: null}
                        }
                        return item
                    })
                    return{...prev, pages: [pages]}
                }
            )
        }
    })
}