import { useQuery } from "@tanstack/react-query"
import { fetchBlog } from "./fetcher"


export const useBlogInfo = (pathname: string)=>{
    return useQuery({
        queryKey: ["blog"],
        queryFn: async()=>{
            return await fetchBlog()
        }
    })
}