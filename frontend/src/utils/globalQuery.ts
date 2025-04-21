import { fetchCategory } from "@/api/category"
import { useQuery } from "@tanstack/react-query"


export const useFetchCategory = ()=>{
    return useQuery({
        queryKey: ['getCategory'],
        queryFn: async()=>{
            return fetchCategory()
        }
    })  
}