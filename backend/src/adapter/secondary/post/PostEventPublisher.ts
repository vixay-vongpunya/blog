import { PostCreateEventData } from "@root/src/application/Email/types/IEmail"
import { PostEventPublisherPort } from "@root/src/application/Post/port/secondary/PostEventPublisherPort"
import eventClient from "@root/src/infrastructure/events/RabbitMQService"


export class PostEventPublisher implements PostEventPublisherPort{
    private eventClient: typeof eventClient
    private readonly exchange = "post.events"

    constructor(){
        this.eventClient = eventClient
    }
    
    async created(payload: PostCreateEventData){
        console.log("post.created before", payload)
        this.eventClient.publish(this.exchange, "post.created", payload)
    }
}