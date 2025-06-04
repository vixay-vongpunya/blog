import { server } from "@/utils/axios"
import { Post} from "@/domains/post/types"

export const getRecentPosts = async():Promise<Post[]> => {
    try{
        const response = await server.get(`/posts/recent`)
        return response.data
    }
    catch(error){
        throw error
    }
}




