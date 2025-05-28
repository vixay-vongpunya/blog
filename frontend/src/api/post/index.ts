import { server } from "@/utils/axios"
import { Post, PostId, PostSearch } from "@/domains/post/types"
import { Comment, CommentCreate } from "@/domains/comment/types"
import { UserId } from "@/domains/user/types"
import { CategoryId } from "@/domains/category/types"



export const createPost = async(data:any):Promise<Post> =>{
    try{
        const response = await server.post('/posts', data)
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

// fetch request
// get a postlist by author id 

type GetPostsByCategory = {
    posts: Post[];
    subscriptionId: string
}

export const getPostsByCategory = async(categoryId: CategoryId): Promise<GetPostsByCategory> => {
    try{
        const response = await server.get(`/categories/${categoryId}/posts`)
        return response.data
    }
    catch(error){
        throw error
    }
}

// content of a post
export const getPostById = async(postId: PostId) => {
    try{
        const response = await server.get(`/posts/${postId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getPostsBySearch = async(data: PostSearch) => {
    try{
        const response = await server.get(`/posts/search?keyword=${data.keyword}&take=${data.take}&cursor=${data.cursor}&page=${data.page}&order=${data.order}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getRecentPosts = async():Promise<{posts: Post[]}> => {
    try{
        const response = await server.get(`/posts/recent`)
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
