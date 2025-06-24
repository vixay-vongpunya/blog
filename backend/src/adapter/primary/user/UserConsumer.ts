import { UserEventPort } from "@root/src/application/User/port/primary/UserEventPort";
import eventClient from "@root/src/infrastructure/events/RabbitMQService";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserConsumer{
    constructor(@inject("UserEventUsecase") private userEventUsecase: UserEventPort){

    }

    async consume(){
        const channel = eventClient.getChannel()
        const userVectorUpdateQueue = await channel.assertQueue("user.vector.queue")
        //(queue, exchange name, routing key)
        await channel.bindQueue(userVectorUpdateQueue.queue, "user.events", "user.vector")

        channel.consume(userVectorUpdateQueue.queue, async(msg: any) => {
            const content = JSON.parse(msg.content.toString())
            console.log("user vec event", content)
            
            await this.userEventUsecase.userVectorUpdate(content.userId)
        })
    }

}