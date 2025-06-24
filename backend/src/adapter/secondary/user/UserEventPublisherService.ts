
import { UserEventPublisherServicePort } from "@root/src/application/User/port/secondary/UserEventPublisherServicePort";
import eventClient from "@root/src/infrastructure/events/RabbitMQService";


export class UserEventPublisherService implements UserEventPublisherServicePort{
    private eventClient: typeof eventClient
    private readonly exchange = "user.events"
    constructor(){
        this.eventClient = eventClient
    }
    
    async create(payload: any){
        this.eventClient.publish(this.exchange, "user.created", payload)
    }

    async updateUserVector(userId: string){
        this.eventClient.publish(this.exchange, "user.vector", {userId: userId})
    }
}