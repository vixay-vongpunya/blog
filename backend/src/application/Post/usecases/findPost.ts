import { FindPostPort } from "../port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindPostRepositoryPort } from "../port/secondary/FindPostRepositoryPort";
import { IPostSearch } from "../domain/IPost";

@injectable()
export class FindPostUseCase implements FindPostPort{
    constructor(@inject("FindPostRepository") private findPostRepository: FindPostRepositoryPort){
        this.findPostRepository = findPostRepository
    }

    async findPostsByUserId(userId: string): Promise<any | null> {
        try{
            let posts = await this.findPostRepository.findPostsByUserId(userId)
            this.categoriesTransform(posts)
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findPost(postId: string){
        try{
            let post = await this.findPostRepository.findPost(postId)
            return post
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByKeyword(data: IPostSearch){
        try{
            let posts = await this.findPostRepository.findByKeyword(data)
            this.categoriesTransform(posts)
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findAllPosts(){
        try{
            let posts = await this.findPostRepository.findAllPosts()
            this.categoriesTransform(posts)
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findPostsByCategory(categoryId: string): Promise<any | null> {
        try{
            let posts = await this.findPostRepository.findPostsByCategory(categoryId)
            this.categoriesTransform(posts)
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    private categoriesTransform(posts: Array<{postCategories: Array<{category:any}>}>){
        return posts.forEach(({postCategories, ...post})=>({
            ...post,
            categories: postCategories.map(({category})=>category)
        }))
    }
}