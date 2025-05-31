import { postDelete, postSave } from "@/api/user"
import { getQueryClient } from "@/utils/query-client"
import { useMutation } from "@tanstack/react-query"

const queryClient = getQueryClient()

export const useCreateSavePostMutation = () => {
    return useMutation({
        mutationFn: async(data:any) => {
            return postSave(data.postId)
        },
        onSuccess: async(response, {pageNumber, queryKey}) =>{
            queryClient.setQueryData(queryKey, 
                (prev:any) => {
                    if (!prev) return prev
                    const pages = prev.pages[pageNumber].map((item: any)=>{
                        if(item.id === response.postId){
                            return {...item, savedPost: {id: response.id}}
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
            return postDelete(data.id)
        },
        onSuccess: async(response, {pageNumber, queryKey}) =>{
            queryClient.setQueryData(queryKey, 
                (prev:any) => {
                    if (!prev) return prev
                    const pages = prev.pages[pageNumber].map((item: any)=>{
                        if(item.id === response.postId){
                            return {...item, savedPost: null}
                        }
                        return item
                    })
                    return{...prev, pages: [pages]}
                }
            )
        }
    })
}