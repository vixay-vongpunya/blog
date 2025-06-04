import { Post} from "@/domains/post/types"
import { server } from "@/utils/axios"

// content of a post
export const createPost = async(data:any):Promise<Post> =>{
    try{
        const response = await server.post('/posts', data)
        return response.data
    }
    catch(error){
        throw error
    }
}