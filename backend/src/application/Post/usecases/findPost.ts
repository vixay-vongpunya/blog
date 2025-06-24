import { FindPostPort } from "../port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";
import { FindPostRepositoryPort } from "../port/secondary/FindPostRepositoryPort";
import { VectorStoreService } from "@root/src/adapter/secondary/vectorStoreService/VectorStoreService";
import { PostEventPublisherServicePort } from "../port/secondary/PostEventPublisherServicePort";
import { postProcessing, postsProcessing } from "../../helpers/posts_processing";
import cacheClient from "@infrastructure/cache/redis"
import { IVectorSearchData, IVectorTotalPageSearchData } from "../../VectorStoreService/types/IVectorStore";
import { UserViewedPostRepositoryPort } from "../../UserViewedPost/port/secondary/UserViewedPostRepositoryPort";
import { UserEventPublisherServicePort } from "../../User/port/secondary/UserEventPublisherServicePort";
import { VectorStoreServicePort } from "../../VectorStoreService/port/secondary/VectorStoreServicePort";
import { SearchHistoryRepositoryPort } from "../../SearchHistory/port/secondary/SearchHistoryRepositoryPort";
import { FindSubscriptionRepositoryPort } from "../../Subscription/port/secondary/FindSubscriptionRepositoryPort";
import { IPostsByAuthors, IPostsByAuthorsToDomain } from "../domain/IPost";
@injectable()
export class FindPostUsecase implements FindPostPort{
    private readonly viewThreshold = 1;
    private postsProcessing : typeof postsProcessing
    private postProcessing : typeof postProcessing
    private cacheClient: typeof cacheClient
    constructor(@inject("FindPostRepository") private findPostRepository: FindPostRepositoryPort,
            @inject("VectorStoreService") private vectorStoreService: VectorStoreServicePort,
            @inject("PostEventPublisherService") private postEventPublisherService: PostEventPublisherServicePort,
            @inject("UserEventPublisherService") private userEventPublisherService: UserEventPublisherServicePort,
            @inject("SearchHistoryRepository") private searchHistoryRepository: SearchHistoryRepositoryPort,
            @inject("FindSubscriptionRepository") private findSubscriptionRepository: FindSubscriptionRepositoryPort){
                this.postsProcessing = postsProcessing;
                this.postProcessing = postProcessing;
                this.cacheClient = cacheClient;
    }

    //find a post content
    async findPost(userId: string, postId: string){
        let postData = await this.findPostRepository.findPost(userId, postId)
        // const data = {
        //     userId: userId,
        //     postId: postId,
        // }

        // let cachedView = await this.cacheClient.getViewedPostCount(userId)
        // if(cachedView === this.viewThreshold){
        //     this.userEventPublisherService.updateUserVector(userId)   
        //     this.cacheClient.resetViewedPostCount(userId)
        // }
        // //need to check if user have id
        // this.cacheClient.setViewedPostCount(userId)
        // this.postEventPublisherService.viewed(data)
        console.log(postData)
        let post = this.postProcessing(postData)
        return post
    }

    async findPostsByAuthor(authorId: string, cursor: string | undefined){
        let posts = await this.findPostRepository.findPostsByAuthor(authorId, cursor)
        // posts.map((post:any)=>
        //     this.postEventPublisherService.create({
        //         authorId: authorId,
        //         title: post.title,
        //         postId: post.id,
        //         preview: post.preview,
        //     })
        // )
        //just mocking data
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
    //might not need
    async findSearchTotalPages(data: IVectorTotalPageSearchData){
        let cachedData = await this.cacheClient.getPostSearchIds(data.sessionId)
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

    async findFollowingPosts(data: IPostsByAuthorsToDomain){
        // let cachedAuthorIds = await this.cacheClient.getFollowingAuthorIds(data.sessionId)
        // let authorIds = JSON.parse(cachedAuthorIds)
        // if(!authorIds){
        //     authorIds = await this.findSubscriptionRepository.findUserSubscriptionFollowing(data.userId)
        //     await this.cacheClient.setFollowingAuthorIds(data.sessionId, JSON.stringify(authorIds))
        // }
        let authorIds = await this.findSubscriptionRepository.findUserSubscriptionFollowing(data.userId)
        authorIds = authorIds.map((item: any)=>item.authorId)

        let dataToRepo = {
            userId: data.userId,
            authorIds: authorIds,
            cursor: data.cursor
        }

        let postsData = await this.findPostRepository.findPostsByAuthors(dataToRepo)
        
        let postList = this.postsProcessing(postsData)
        return postList  

    }
        

    async findBySemanticQuery(data: IVectorSearchData){
        //use offset here since i use chromadb(need to cache the ids anyway)
        console.log(data.sessionId)
        let cachedData = await this.cacheClient.getPostSearchIds(data.sessionId)
        let mapIds: string[] = []
        let cachedParsed = JSON.parse(cachedData)
        if(!cachedData || cachedParsed.query !== data.query){
            //need to change the return 
            mapIds = await this.vectorStoreService.find(data.query)
            const dataToCache = {
                query: data.query,
                list: mapIds,
                pagesCount: Math.ceil(mapIds.length / data.take)
            }
            await Promise.all([
                this.cacheClient.setPostSearchIds(data.sessionId, JSON.stringify(dataToCache)),
                this.searchHistoryRepository.create({userId: data.userId, query: data.query})
            ])
            // when user just paste the url, mostly not stable
            // google also dont make it stable due to vectorstore
        }
        else{
            mapIds = cachedParsed.list
        }       
        
        //might need to check if cursor is valid
        console.log("cached", mapIds)

        // not logged in user dont have user id here
        let postsData = await Promise.all(
            mapIds.slice((data.page-1)*data.take, data.take).map((postId: string) =>
                this.findPostRepository.findPostPreview(postId, data?.userId)
            )
        )
        
        let postList = this.postsProcessing(postsData)
        return postList  
    }
        

    //just a dummy use casew
    async findFeedPosts(data: IVectorSearchData){
        //will get list of ids
        let cachedData = await this.cacheClient.getUserFeedIds(data.sessionId)
        let mapIds: string[] = []

        if(!cachedData){
            //need to detect if user this is logged in
            if(data.userId){
                mapIds = await this.vectorStoreService.findUserFeed(data.userId)
            }
            else{
                //give default feed
                // need to get that from here
            }
            
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
        console.log("cached feed", mapIds)

        // need to check the userId first
        let postsData = await Promise.all(
            mapIds.slice((data.page-1)*data.take, data.take).map((postId: string) =>
                this.findPostRepository.findPostPreview(postId, data.userId)
            )
        )
        
        let postList = this.postsProcessing(postsData)
        return postList
    }
    

    async findByCategory(userId: string, categoryId: string, cursor: string | undefined) {
        const posts = await this.findPostRepository.findByCategory(userId, categoryId, cursor)
        const postList = this.postsProcessing(posts)
        // need recommended system for this
        // for authors, i will send seperate api so i can cursor query it
        return postList
    }        
}