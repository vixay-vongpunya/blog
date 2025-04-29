import { getPostsByCategory } from "@/api/post"
import { useQuery } from "@tanstack/react-query"


export const useGetPostsByCategory = (categoryId:string) =>{
    return useQuery({
        queryKey: ['posts-by-category'],
        queryFn: async()=>{
            return getPostsByCategory(categoryId)
        }
    })
}