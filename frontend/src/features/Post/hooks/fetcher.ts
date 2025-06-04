import { CommentCreate } from "@/domains/comment/types"
import { Post, PostId } from "@/domains/post/types"
import { server } from "@/utils/axios"

export const getPostById = async(postId: PostId) => {
    try{
        const response = await server.get(`/posts/${postId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getCommentsByPost = async(postId: PostId):Promise<Comment[]> =>{
    try{
        const response = await server.get(`/posts/${postId}/comments`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const createComment = async(data: CommentCreate):Promise<Post> =>{
    try{
        const response = await server.post(`/posts/${data.postId}/comments`, {content: data.content})
        return response.data
    }
    catch(error){
        throw error
    }
}