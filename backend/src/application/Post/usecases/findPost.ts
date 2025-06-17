import { FindPostPort } from "../port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindPostRepositoryPort } from "../port/secondary/FindPostRepositoryPort";
import { IPostSearch, IPostSearchToTalPage } from "../domain/IPost";
import { VectorStoreService } from "@root/src/adapter/secondary/vectorStoreService/VectorStoreService";
import { PostEventPublisherServicePort } from "../port/secondary/PostEventPublisherServicePort";
import { postsProcessing } from "../../helpers/posts_processing";
import cacheClient from "@infrastructure/cache/redis"
@injectable()
export class FindPostUsecase implements FindPostPort{
    private postsProcessing : typeof postsProcessing
    private cacheClient: typeof cacheClient
    constructor(@inject("FindPostRepository") private findPostRepository: FindPostRepositoryPort,
            @inject("VectorStoreService") private vectorStoreService: VectorStoreService,
            @inject("PostEventPublisherService") private PostEventPublisherService: PostEventPublisherServicePort){
                this.postsProcessing = postsProcessing;
    }

    //find a post content
    async findPost(postId: string){
        let post = await this.findPostRepository.findPost(postId)
        return post
    }

    async findPostsByAuthor(authorId: string, cursor: string | undefined){
        let posts = await this.findPostRepository.findPostsByAuthor(authorId, cursor)
        //just mocking data
        posts.forEach((post:any)=>{
            this.PostEventPublisherService.create({authorId: authorId, postId: post.id,title: post.title, preview: post.preview})
        })
        let postList = this.postsProcessing(posts)
        return postList
    }

    //might not need
    async findRecentPosts(userId: string){
        let posts = await this.findPostRepository.findRecentPosts(userId)
        let postList = this.postsProcessing(posts)
        return postList
    }
        

    //for search panel, pagination
    // async findSearchTotalPages(data: IPostSearchToTalPage){
    //     let totalCount = await this.findPostRepository.findSearchTotalPages(data)
    //     return totalCount
    // }
        


    //enabled for both paginaiton and infinite scroll
    // async findByQuery(data: IPostSearch){
    //     let posts = await this.findPostRepository.findByQuery(data)
    //     let postList = this.postsProcessing(posts)
    //     return postList  
    // }
        

    async findBySemanticQuery(query: string, userId: string){

        let cacheIds = JSON.parse(this.cacheClient.getPostSearchIds())

        if(!cacheIds){
            //need to change the return 
            cacheIds = await this.vectorStoreService.find(query)
        }

        let postsData = await Promise.all(
            cacheIds[0].map((postId: string)=>
                this.findPostRepository.findPostPreview(postId, userId)
            )
        )
        let postList = this.postsProcessing(postsData)
        return postList  
    }
        

    //just a dummy use casew
    async findAllPosts(userId: string){
        let posts = await this.findPostRepository.findAllPosts(userId)
        let postList = this.postsProcessing(posts)
        return postList
    }
    

    async findByCategory(userId: string, categoryId: string, cursor: string) {
        const posts = await this.findPostRepository.findByCategory(userId, categoryId, cursor)
        const postList = this.postsProcessing(posts)
        // need recommended system for this
        // for authors, i will send seperate api so i can cursor query it
        return postList
    }
        
}