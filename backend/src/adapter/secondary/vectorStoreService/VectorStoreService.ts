import { IVectorStoreCreateData, IVectorStoreUserVectorUpdateData } from "@root/src/application/VectorStoreService/types/IVectorStore";

export class VectorStoreService{
    async store(data: IVectorStoreCreateData){
        console.log("arrived to service", data)
        await fetch(process.env.EMBEDDING_SERVICE_URL+"/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    }

    async updateUserVector(data: IVectorStoreUserVectorUpdateData){
        console.log("data to update user vec", data)
        await fetch(process.env.EMBEDDING_SERVICE_URL+"/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    }

    async find(query: string){
        const response = await fetch(process.env.EMBEDDING_SERVICE_URL+`/posts/semantic_search?query=${query}&page_size=${10}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json()
    }

    async findRelatedPosts(postId: string){
        const response = await fetch(process.env.EMBEDDING_SERVICE_URL+`/posts/${postId}/related`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json()
    }

    async findUserFeed(userId: string){
        const response = await fetch(process.env.EMBEDDING_SERVICE_URL+`/users/${userId}/posts/feed`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json()
    }
}