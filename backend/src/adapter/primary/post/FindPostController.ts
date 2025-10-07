
import { FindPostPort } from "@root/src/application/Post/port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindPostController{
    constructor(@inject("FindPostUsecase") private findPostUseCase: FindPostPort){
    }

    async findPost(userId: string, postId: string){
        let post = await this.findPostUseCase.findPost(userId, postId)
        return post
    }
    
    async findPopularPosts(userId: string, cursor: string){
        const data = {
            userId: userId,
            cursor: cursor === "undefined" ? undefined: cursor
        }
        
        let posts = await this.findPostUseCase.findPopularPosts(data)
        return posts
    }

    async findPostsByAuthor(authorId: string, cursor: string){
        let sanitizedCursor = cursor === "undefined" ? undefined: cursor
        let posts = await this.findPostUseCase.findPostsByAuthor(authorId, sanitizedCursor)
        return posts
    }

    async findFollowingPosts(userId: string, sessionId: string, cursor: string){
        let data = {
            userId: userId,
            sessionId: sessionId,
            cursor: cursor === "undefined" ? undefined: cursor
        }
        let posts = await this.findPostUseCase.findFollowingPosts(data)
        console.log("following posts jra", posts)
        return posts
    }

    // to avoid duplication since the logic is simple and they query the same data
    // cursor and offset-based are using the same repo here
    async findSearchTotalPages(data: any){
        if(typeof data.take == 'string'){
            data.take = JSON.parse(data.take)
        }

        const postQuery = {
            query: data.query as string,
            take: data.take,
            sessionId: data.sessionId,
            userId: data.userId
        } 

        let totalCount = await this.findPostUseCase.findSearchTotalPages(postQuery)
        return totalCount
    } 

    // async findByQuery(data: any){
    //     if(typeof data.take == 'string'){
    //         data.take = JSON.parse(data.take)
    //     }

    //     if(typeof data.page == 'string'){
    //         data.page = JSON.parse(data.page)
    //     }
        
    //     const postQuery = {
    //         userId: data.userId,
    //         query: data.query as string,
    //         take: data.take,
    //         cursor: data.cursor as string,
    //         page: data.page,
    //         order: data.order as 'asc' | 'desc'
    //     } 
        
    //     let post = await this.findPostUseCase.findByQuery(postQuery)
    //     return post
    // }

    async findBySemanticQuery(data: any){
        let queryData = {
            query: data.query,
            page: Number(data.page),
            take: Number(data.take),
            userId: data.userId ? data.userId : undefined,
            sessionId: data.sessionId,
        }
        let posts = await this.findPostUseCase.findBySemanticQuery(queryData)
        return posts
    }

    async findFeedPosts(data: any){
        let queryData = {
            page: Number(data.page),
            take: Number(data.take),
            userId: data.userId ? data.userId : undefined,
            sessionId: data.sessionId,
        }

        let posts = await this.findPostUseCase.findFeedPosts(queryData)
        return posts
    }

    async findByCategory(userId: string, categoryId: string, cursor: string){
        let sanitizedCursor = cursor === "undefined" ? undefined: cursor
        let data = await this.findPostUseCase.findByCategory(userId, categoryId, sanitizedCursor)
        return data
    }
}