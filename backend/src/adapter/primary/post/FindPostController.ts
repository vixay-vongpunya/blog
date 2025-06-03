
import { FindPostPort } from "@root/src/application/Post/port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindPostController{
    constructor(@inject("FindPostUsecase") private findPostUseCase: FindPostPort){
    }

    async findPostsByAuthor(authorId: string, cursor: string){
        let sanitizedCursor = cursor === "undefined" ? undefined: cursor
        let posts = await this.findPostUseCase.findPostsByAuthor(authorId, sanitizedCursor)
        return posts
    }

    async findPost(postId: string){
        let post = await this.findPostUseCase.findPost(postId)
        return post
    }

    async findRecentPosts(userId: string){
        let posts = await this.findPostUseCase.findRecentPosts(userId)
        return posts
    }

    // to avoid duplication since the logic is simple and they query the same data
    // cursor and offset-based are using the same repo here
    async findSearchTotalPages(data: any){
        if(typeof data.take == 'string'){
            data.take = JSON.parse(data.take)
        }

        const postQuery = {
            keyword: data.keyword as string,
            take: data.take,
            order: data.order as 'asc' | 'desc'
        } 

        let totalCount = await this.findPostUseCase.findSearchTotalPages(postQuery)
        return totalCount
    } 

    async findByKeyword(data: any){
        if(typeof data.take == 'string'){
            data.take = JSON.parse(data.take)
        }
        if(typeof data.page == 'string'){
            data.page = JSON.parse(data.page)
        }
        const postQuery = {
            userId: data.userId,
            keyword: data.keyword as string,
            take: data.take,
            cursor: data.cursor as string,
            page: data.page,
            order: data.order as 'asc' | 'desc'
        } 
        let post = await this.findPostUseCase.findByKeyword(postQuery)
        return post
    }

    async findAllPosts(userId: string){
        let posts = await this.findPostUseCase.findAllPosts(userId)
        return posts
    }

    async findByCategory(userId: string, categoryId: string, cursor: string){
        let data = await this.findPostUseCase.findByCategory(userId, categoryId, cursor)
        return data
    }

    
}