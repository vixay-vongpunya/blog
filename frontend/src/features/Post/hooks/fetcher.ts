import { Comment, CommentCreate } from "@/domains/comment/types"
import { Post, PostId } from "@/domains/post/types"
import { server } from "@/utils/axios"

export const getPostById = async(postId: PostId) : Promise<Post>=> {
    try{
        const response = await server.get(`/posts/${postId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getRelatedPostsByPost = async(postId: PostId, cursor: string | undefined, take: number) => {
    try{
        const response = await server.get(`/posts/${postId}/related`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getCommentsByPostTotalCount = async(postId: PostId):Promise<number> =>{
    try{
        const response = await server.get(`/posts/${postId}/comments/total_count`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getCommentsByPost = async(postId: PostId, cursor: string | undefined, take: number):Promise<Comment[]> =>{
    try{
        const response = await server.get(`/posts/${postId}/comments?cursor=${cursor}&take=${take}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getCommentReplies = async(commentId: string, cursor: string | undefined):Promise<Comment[]> =>{
    try{
        const response = await server.get(`/comments/${commentId}/replies?cursor=${cursor}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const createComment = async(data: CommentCreate):Promise<Post> =>{
    try{
        const response = await server.post(`/posts/${data.postId}/comments`, {content: data.content, parentId: data.parentId, replyToUserId: data.replyToUserId})
        return response.data
    }
    catch(error){
        throw error
    }
}