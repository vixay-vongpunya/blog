import { PostSendEmailData } from "@root/src/application/Email/types/IEmail"
import { PostEventPublisherServicePort } from "@root/src/application/Post/port/secondary/PostEventPublisherServicePort"
import eventClient from "@root/src/infrastructure/events/RabbitMQService"

export class PostEventPublisherService implements PostEventPublisherServicePort{
    private eventClient: typeof eventClient
    private readonly exchange = "post.events"

    constructor(){
        this.eventClient = eventClient
    }
    
    create(payload: PostSendEmailData){
        this.eventClient.publish(this.exchange, "post.email", payload)
        this.eventClient.publish(this.exchange, "post.embed", {
            payload:{
                authorId: payload.authorId,
                postId: payload.postId,
                preview: payload.preview
            }
        })
    }
}