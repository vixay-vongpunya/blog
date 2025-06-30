import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { PostEventPort } from "../port/primary/PostEventPort";
import { injectable, inject } from "tsyringe";
import { EmailServicePort } from "../../Email/port/secondary/EmailServicePort";
import { FindUserRepositoryPort } from "../../User/port/secondary/FindUserRepositoryPort";
import { FindSubscriptionRepositoryPort } from "../../Subscription/port/secondary/FindSubscriptionRepositoryPort";
import { IVectorStoreCreateData } from "../../VectorStoreService/types/IVectorStore";
import { VectorStoreServicePort } from "../../VectorStoreService/port/secondary/VectorStoreServicePort";
// import { IUserViewedPost } from "../../UserViewedPost/domain/IUserViewedPost";
import { UserViewedPostRepositoryPort } from "../../UserViewedPost/port/secondary/UserViewedPostRepositoryPort";
import { PostRepositoryPort } from "../port/secondary/PostRepositoryPort";
import cacheClient from "@root/src/infrastructure/cache/redis";

@injectable()
export class PostEventUsecase implements PostEventPort{
    private cacheClient: typeof cacheClient
    constructor( @inject("FindSubscriptionRepository") private findSubscriptionRepository: FindSubscriptionRepositoryPort,
        @inject("FindUserRepository") private findUserRepository: FindUserRepositoryPort,
        @inject("VectorStoreService") private vectorStoreService: VectorStoreServicePort,
        @inject("EmailService") private emailService: EmailServicePort,
        @inject("UserViewedPostRepository") private userViewedPostRepository: UserViewedPostRepositoryPort,
        @inject("PostRepository") private postRepository: PostRepositoryPort){
            this.cacheClient = cacheClient
    }

    async sendEmail(data: any){
        //send email to all users
        //this data: author Id & name
        const author = await this.findUserRepository.findById(data.authorId)
        console.log("author name", author)
        const subscribers = await this.findSubscriptionRepository.findUserSubscriptionFollower(data.authorId)
        subscribers.map(async({user}:any)=>{
            await this.emailService.sendPostSubscription({
                email: user.email,
                authorName: author.displayName,
                title: data.title, 
                preview: data.preview,
                url: process.env.FRONTEND_URL+"/post/"+data.postId,
                authorURL: process.env.FRONTEND_URL+"/profile/"+author.name,
            })
        })
    }
        
    async storeVectorData(data: IVectorStoreCreateData){
        await this.vectorStoreService.store(data)        
    }

    async viewed(){
        const result: {postId: string, count: number, key: string}[] = []
        let nextCursor = '0'
        
        do {
            const {cursor, keys} = await this.cacheClient.scan(nextCursor, 'posts:*:views')
            nextCursor = cursor
            
            if(keys.length > 0){
                
                const values = await this.cacheClient.mGet(keys)
                console.log(values)
                keys.forEach((key, i)=>(
                    result.push({
                        postId: key.split(':')[1],
                        count: parseInt(values[i] as string) || 0,
                        key: key
                    })
                ))
            }
        } while(nextCursor !== '0')
        
        await Promise.all(result.map(item => this.postRepository.updateViews({postId: item.postId, count: item.count})));

        if(result.length > 0) {
            const keys = result.map(item=>item.key)
            this.cacheClient.removeCachedViewedPosts(keys)
        }

        // await this.userViewedPostRepository.create(data)
        
    }
}