import { server } from "@/utils/axios"
import { Post} from "@/domains/post/types"

export const getFeedPosts = async(page: number, take: number):Promise<Post[]> => {
    try{
        console.log("request feed")
        const response = await server.get(`/users/posts/feed?page=${page}&take=${take}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getFeedFollowingPosts = async(cursor: string | undefined):Promise<Post[]> => {
    try{
        const response = await server.get(`/users/posts/following?cursor=${cursor}`)
        console.log("following", response)
        return response.data
    }
    catch(error){
        throw error
    }
}