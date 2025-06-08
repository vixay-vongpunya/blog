
import { UserEventPublisherPort } from "@root/src/application/User/port/secondary/UserEventPublisherPort";
import eventClient from "@root/src/infrastructure/events/RabbitMQService";


export class UserEventPublisher implements UserEventPublisherPort{
    private eventClient: typeof eventClient
    private readonly exchange = "user.events"
    constructor(){
      
    }
    
    async create(payload: any){
        this.eventClient.publish(this.exchange, "user.created", payload)
    }
}