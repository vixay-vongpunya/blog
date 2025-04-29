import { getAllPosts, getPostsByAuthor } from "@/api/post"
import { useQuery } from "@tanstack/react-query"

export const useGetPostsByAuthorQuery = (authorId: string) => {
    return useQuery({   
        queryKey: ['posts'],
        queryFn:async()=>{
            return getPostsByAuthor(authorId)
        },

    })
}

export const useGetAllPostsQuery = () => {
    return useQuery({   
        queryKey: ['all-posts'],
        queryFn:async()=>{
            return getAllPosts()
        },

    })
}