import { FindPostPort } from "../port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindPostRepositoryPort } from "../port/secondary/FindPostRepositoryPort";
import { VectorStoreService } from "@root/src/adapter/secondary/vectorStoreService/VectorStoreService";
import { PostEventPublisherServicePort } from "../port/secondary/PostEventPublisherServicePort";
import { postsProcessing } from "../../helpers/posts_processing";
import cacheClient from "@infrastructure/cache/redis"
import { IVectorSearchData, IVectorTotalPageSearchData } from "../../VectorStoreService/types/IVectorStore";
@injectable()
export class FindPostUsecase implements FindPostPort{
    private postsProcessing : typeof postsProcessing
    private cacheClient: typeof cacheClient
    constructor(@inject("FindPostRepository") private findPostRepository: FindPostRepositoryPort,
            @inject("VectorStoreService") private vectorStoreService: VectorStoreService,
            @inject("PostEventPublisherService") private PostEventPublisherService: PostEventPublisherServicePort){
                this.postsProcessing = postsProcessing;
                this.cacheClient = cacheClient
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
    async findSearchTotalPages(data: IVectorTotalPageSearchData){
        let cachedData = await this.cacheClient.getPostSearchIds(data.sessionId) as string
        let pagesCount = 0

        if(!cachedData){
            let Ids = await this.vectorStoreService.find(data.query)
            pagesCount =  Math.ceil(Ids.length / data.take)
            const dataToCache = {
                list: Ids,
                pagesCount: pagesCount
            }
            await this.cacheClient.setPostSearchIds(data.sessionId, JSON.stringify(dataToCache))
        }
        else{
            pagesCount = JSON.parse(cachedData).pagesCount
        }   
        
        return pagesCount
    }
        


    //enabled for both paginaiton and infinite scroll
    // async findByQuery(data: IPostSearch){
    //     let posts = await this.findPostRepository.findByQuery(data)
    //     let postList = this.postsProcessing(posts)
    //     return postList  
    // }
        

    async findBySemanticQuery(data: IVectorSearchData){
        //use offset here since i use chromadb(need to cache the ids anyway)
        let cachedData = await this.cacheClient.getPostSearchIds(data.sessionId) as string
        let mapIds: string[] = []

        if(!cachedData){
            //need to change the return 
            mapIds = await this.vectorStoreService.find(data.query)
            const dataToCache = {
                list: mapIds,
                pagesCount: Math.ceil(mapIds.length / data.take)
            }
            await this.cacheClient.setPostSearchIds(data.sessionId, JSON.stringify(dataToCache))
            // when user just paste the url, mostly not stable
            // google also dont make it stable due to vectorstore
        }
        else{
            mapIds = JSON.parse(cachedData).list
        }       
        
        //might need to check if cursor is valid
        console.log("cached", mapIds)

        let postsData = await Promise.all(
            mapIds.slice((data.page-1)*data.take, data.take).map((postId: string) =>
                this.findPostRepository.findPostPreview(postId, data.userId)
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