import { FindPostPort } from "../port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindPostRepositoryPort } from "../port/secondary/FindPostRepositoryPort";
import { IPostSearch, IPostSearchToTalPage } from "../domain/IPost";
import { VectorStoreService } from "@root/src/adapter/secondary/vectorStoreService/VectorStoreService";
import { PostEventPublisherServicePort } from "../port/secondary/PostEventPublisherServicePort";

@injectable()
export class FindPostUsecase implements FindPostPort{
    constructor(@inject("FindPostRepository") private findPostRepository: FindPostRepositoryPort,
                @inject("VectorStoreService") private vectorStoreService: VectorStoreService,
            @inject("PostEventPublisherService") private PostEventPublisherService: PostEventPublisherServicePort){
    }

    async findPostsByAuthor(authorId: string, cursor: string): Promise<any | null> {
        try{
            let posts = await this.findPostRepository.findPostsByAuthor(authorId, cursor)
            posts.forEach((post:any)=>{
                this.PostEventPublisherService.create({authorId: authorId, postId: post.id,title: post.title, preview: post.preview})
            })
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

    async findRecentPosts(userId: string){
        try{
            let posts = await this.findPostRepository.findRecentPosts(userId)
            let postList = this.categoriesTransform(posts)
            return postList
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findSearchTotalPages(data: IPostSearchToTalPage){
        try{
            let totalCount = await this.findPostRepository.findSearchTotalPages(data)
            return totalCount
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

    async findBySemanticQuery(query: string, userId: string){
        try{
            let posts = await this.vectorStoreService.find(query)
            console.log("semantic result", posts[0])
            let postsData = await Promise.all(
                posts[0].map((postId: string)=>
                    this.findPostRepository.findPostPreview(postId, userId)
                )
            )
            let postList = this.categoriesTransform(postsData)
            console.log("log after data", postList)
            return postList  
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findAllPosts(userId: string){
        try{
            let posts = await this.findPostRepository.findAllPosts(userId)
            let postList = this.categoriesTransform(posts)
            return postList
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByCategory(userId: string, categoryId: string, cursor: string): Promise<any | null> {
        try{
            const posts = await this.findPostRepository.findByCategory(userId, categoryId, cursor)
            const postList = this.categoriesTransform(posts)
            // need recommended system for this
            // for authors, i will send seperate api so i can cursor query it
            return postList
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    private categoriesTransform(posts: any){
        console.log(posts)
        //faster than mutating with forEach + delete (delete is slow)
        // since posts is typed as any, so i need to spread and access each to change the name too
        return posts.map((post:any)=>{
            return ({
            ...post,
            imagePath: post.imagePath ? `http://localhost:4000/public/posts/${post.imagePath}` : null,
            categories: post.postCategories?.map(({category}:any)=>category),
            savedPost: post.savedPosts.length>0 ? {id: post.savedPosts[0].id} : null,
            author: {
                ...post.author,
                profileImage: post.author.profileImage ? `http://localhost:4000/public/users/${post.author.profileImage}` : null,
            }
            })
        })
    }
}