import { getRecentPosts} from "@/api/post"
import { getPostsByAuthor } from "@/api/user"
import { useQuery } from "@tanstack/react-query"

export const useGetPostsByAuthorQuery = (authorId: string) => {
    return useQuery({   
        queryKey: ['posts'],
        queryFn:async()=>{
            const response = await getPostsByAuthor(authorId)
            return{
                pages: [response]
            }
        },

    })
}

//need to change this later
export const useGetAllPostsQuery = () => {
    return useQuery({   
        queryKey: ['all-posts'],
        queryFn:async()=>{
            const response = await getRecentPosts()
            return{
                pages: [response]
            }
        },
        gcTime: 1,

    })
}

export const useGetRecentPostsQuery = () => {
    return useQuery({   
        queryKey: ['all-posts'],
        queryFn:async()=>{
            const response = await getRecentPosts()
            console.log("b", response)
            return{
                pages: [response]
            }
        },
        gcTime: 1,

    })
}