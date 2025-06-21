import { server } from "@/utils/axios"

// all posts will be saved in pages
export const getPostsBySearchToTalPages = async(
    query: string,
    take: number = 12,
):Promise<number> => {
    try{
        const response = await server.get(`/posts/search/total-pages?query=${query}&take=${take}`)
        console.log(response)
        return response.data
    }
    catch(error){
        throw error
    }
}

// export const getPostsBySearch = async(data: PostSearch) => {
//     try{
//         const response = await server.get(`/posts/search?query=${data.keyword}&take=${data.take}&cursor=${data.cursor}&page=${data?.page}&order=${data.order}`)
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }

export const getPostsBySemanticSearch = async(query: string, page: number, take: number = 12) => {
    try{
        const response = await server.get(`/posts/semantic_search?query=${query}&page=${page}&take=${take}`)
        return response.data
    }
    catch(error){   
        throw error
    }
}