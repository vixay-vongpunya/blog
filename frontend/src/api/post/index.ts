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
    categories: Category[]
}

export const createPost = async(data:any) =>{
    try{
        const response = await server.post('/post/create', data)
        return response
    }
    catch(error){
        throw error
    }
}

// get a postlist by author id
export const getPostsByAuthor = async(authorId: string) =>{
    try{
        const response = await server.get(`/post?authorId=${authorId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}   


// content of a post
export const getPost = async(pathname: string) =>{
    try{
        const response = await server.get(`/post/${pathname}`)
        console.log("hey", response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}