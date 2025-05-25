import { fetchCategory } from "@/api/category"
import { useQuery } from "@tanstack/react-query"

export const useGetCategoryQuery = ()=>{
    return useQuery({
        queryKey: ['get-category'],
        queryFn: async()=>{
            return fetchCategory()
        },
        staleTime: Infinity,
    })  
}