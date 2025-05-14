import { FindPostPort } from "../port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindPostRepositoryPort } from "../port/secondary/FindPostRepositoryPort";
import { IPostSearch } from "../domain/IPost";
import { FindSubscriptionRepositoryPort } from "../../Subscription/port/secondary/FindSubscriptionRepositoryPort";

@injectable()
export class FindPostUseCase implements FindPostPort{
    constructor(@inject("FindPostRepository") private findPostRepository: FindPostRepositoryPort,
                @inject("FindSubscriptionRepository") private findSubscriptionRepository: FindSubscriptionRepositoryPort){
        this.findPostRepository = findPostRepository
    }

    async findPostsByUserId(userId: string): Promise<any | null> {
        try{
            let posts = await this.findPostRepository.findPostsByUserId(userId)
            let postList = this.categoriesTransform(posts)
            return postList
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
            let postList = this.categoriesTransform(posts)
            return postList
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findAllPosts(){
        try{
            let posts = await this.findPostRepository.findAllPosts()
            let postList = this.categoriesTransform(posts)
            return postList
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByCategory(categoryId: string, userId: string): Promise<any | null> {
        try{
            const [posts, isSubscribed] = await Promise.all([
                this.findPostRepository.findByCategory(categoryId),
                this.findSubscriptionRepository.findBooleanCategorySubscription(userId, categoryId)
            ])
           
            let postList = this.categoriesTransform(posts)
            return {
                posts: postList, 
                isSubscribed: isSubscribed
            }
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    private categoriesTransform(posts: any){
        //faster than mutating with forEach + delete (delete is slow)
        return posts.map(({image, postCategories, ...post}:any)=>{
            return ({
            ...post,
            image: image ? `http://localhost:4000/uploads/${image}` : null,
            categories: postCategories?.map(({category}:any)=>category)
        })})
    }
}