import { getRecentPosts, getPostsByAuthor } from "@/api/post"
import { useQuery } from "@tanstack/react-query"

export const useGetPostsByAuthorQuery = (authorId: string) => {
    return useQuery({   
        queryKey: ['posts'],
        queryFn:async()=>{
            return getPostsByAuthor(authorId)
        },

    })
}

//need to change this later
export const useGetAllPostsQuery = () => {
    return useQuery({   
        queryKey: ['all-posts'],
        queryFn:async()=>{
            return getRecentPosts()
        },

    })
}

export const useGetRecentPostsQuery = () => {
    return useQuery({   
        queryKey: ['recent-posts'],
        queryFn:async()=>{
            return getRecentPosts()
        },

    })
}