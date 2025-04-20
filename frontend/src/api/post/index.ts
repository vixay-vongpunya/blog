import { server } from "@/utils/axios"


export const createPost = async(data:any) =>{
    try{
        const response = await server.post('/post/create', data)
        return response
    }
    catch(error){
        throw error
    }
}
export const fetchPost = async() =>{
    try{
        console.log("sent")
        const response = await server.get('/post')
        console.log(response)
        return response.data
    }
    catch(error){
        throw error
    }
}