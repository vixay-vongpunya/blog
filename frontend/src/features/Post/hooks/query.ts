import { getPost } from "@/api/post"
import { useQuery } from "@tanstack/react-query"

export const useGetPostQuery = (pathname: string)=>{
    return useQuery({
        queryKey: ["blog"],
        queryFn: async()=>{
            return await getPost(pathname)
        }
    })
}