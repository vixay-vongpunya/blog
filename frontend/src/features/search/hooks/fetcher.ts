import { PostSearch, PostSearchTotalPages } from "@/domains/post/types"
import { server } from "@/utils/axios"

// all posts will be saved in pages
export const getPostsBySearchToTalPages = async(data: PostSearchTotalPages):Promise<number> => {
    try{
        const response = await server.get(`/posts/search/total-pages?keyword=${data.keyword}&take=${data.take}&order=${data.order}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getPostsBySearch = async(data: PostSearch) => {
    try{
        const response = await server.get(`/posts/search?keyword=${data.keyword}&take=${data.take}&cursor=${data.cursor}&page=${data?.page}&order=${data.order}`)
        return response.data
    }
    catch(error){
        throw error
    }
}