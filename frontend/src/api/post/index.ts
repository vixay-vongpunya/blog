import { server } from "@/utils/axios"


export const createPost = async(data:any) =>{
    try{
        const response = server.post('/post', data)
        return response
    }
    catch(error){
        throw error
    }
}