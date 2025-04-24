import { getPostsByAuthor } from "@/api/post"
import { useQuery } from "@tanstack/react-query"

export const useGetPostsByAuthorQuery = (authorId: string) => {
    return useQuery({   
        queryKey: ['posts'],
        queryFn:async()=>{
            return getPostsByAuthor(authorId)
        },

    })
}