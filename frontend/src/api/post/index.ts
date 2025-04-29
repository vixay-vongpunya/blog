import { server } from "@/utils/axios"
import { User } from "../user"
import { Category } from "../category"

export type Post = {
    id : string,
    title : string,
    preview: string,
    content : string,
    image : string,
    authorId : string,
    created: string,
    author: User,
    categories: Category[],
    comments: Comment[],
}

export type Comment = {
    id: string,
    content: string,
    user:{
        id: string,
        name: string,
    },
    postId: string,
    createdAt: Date
}
export type CreateComment = {
    postId: string
    comment: string
}


export const createPost = async(data:any) =>{
    try{
        const response = await server.post('/posts/create', data)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const createComment = async(data: CreateComment) =>{
    try{
        const response = await server.post(`/posts/${data.postId}/comment`, {content: data.comment})
        console.log(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}

// fetch request
// get a postlist by author id
export const getPostsByAuthor = async(authorId: string) =>{
    try{
        const response = await server.get(`/posts/post?authorId=${authorId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}  

export const getPostsByCategory = async(categoryId: string) => {
    try{
        const response = await server.get(`/posts/category/${categoryId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}


// content of a post
export const getPost = async(postId: string) =>{
    try{
        const response = await server.get(`/posts/${postId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getAllPosts = async() =>{
    try{
        const response = await server.get(`/posts/posts/get-all`)
        return response.data
    }
    catch(error){
        throw error
    }
}