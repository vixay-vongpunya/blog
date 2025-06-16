import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { PostEventPort } from "../port/primary/PostEventPort";
import { injectable, inject } from "tsyringe";
import { EmailServicePort } from "../../Email/port/secondary/EmailServicePort";
import { FindUserRepositoryPort } from "../../User/port/secondary/FindUserRepositoryPort";
import { FindSubscriptionRepositoryPort } from "../../Subscription/port/secondary/FindSubscriptionRepositoryPort";
import { IVectorStoreCreateData } from "../../VectorStoreService/types/IVectorStore";
import { VectorStoreServicePort } from "../../VectorStoreService/port/secondary/VectorStoreServicePort";

@injectable()
export class PostEventUsecase implements PostEventPort{
    constructor( @inject("FindSubscriptionRepository") private findSubscriptionRepository: FindSubscriptionRepositoryPort,
        @inject("FindUserRepository") private findUserRepository: FindUserRepositoryPort,
        @inject("VectorStoreService") private vectorStoreService: VectorStoreServicePort,
        @inject("EmailService") private emailService: EmailServicePort){
    }

    async sendEmail(data: any){
        try { 
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
        catch(error){
            throw new UnCaughtError(error)
        }
    }

    async storeVectorData(data: IVectorStoreCreateData){
        try { 
            console.log("data before send mebed", data)
            await this.vectorStoreService.store(data)
        }
        catch(error){
            throw new UnCaughtError(error)
        }
    }
}