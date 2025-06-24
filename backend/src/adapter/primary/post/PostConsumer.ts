import { PostEventPort } from "@root/src/application/Post/port/primary/PostEventPort"
import eventClient from "@root/src/infrastructure/events/RabbitMQService"
import { inject, injectable } from "tsyringe"

@injectable()
export class PostConsumer{
    constructor(@inject("PostEventUsecase") private postEventUsecase: PostEventPort){
    }

    async consume(){
        const channel = eventClient.getChannel()
        const postEmailQueue = await channel.assertQueue("post.email.queue")
        await channel.bindQueue(postEmailQueue.queue, "post.events", "post.email")

        const postEmbedQueue = await channel.assertQueue("post.embed.queue")
        await channel.bindQueue(postEmbedQueue.queue, "post.events", "post.embed")

        const postViewedQueue = await channel.assertQueue("post.viewed.queue")
        await channel.bindQueue(postViewedQueue.queue, "post.events", "post.viewed")

        channel.consume(postEmailQueue.queue, async(msg: any) => {
                            //by default msg content in rabbitMQ is buffer
            const content = JSON.parse(msg.content.toString())
            const data = {
                authorId: content.authorId,
                postId: content.postId,
                title: content.title,
                preview: content.preview,
            }
            
            await this.postEventUsecase.sendEmail(data)
            channel.ack(msg)
            
                        
        })

        channel.consume(postEmbedQueue.queue, async(msg: any) => {
                            //by default msg content in rabbitMQ is buffer
            const content = JSON.parse(msg.content.toString())
            const data = {
                id: content.postId,
                title: content.title,
                preview: content.preview,
            }
            
            await this.postEventUsecase.storeVectorData(data)
            channel.ack(msg)
                        
        })

        channel.consume(postViewedQueue.queue, async(msg: any) => {
                            //by default msg content in rabbitMQ is buffer
            const content = JSON.parse(msg.content.toString())
            console.log("consumed viewed", content)
            const data = {
                userId: content.userId,
                postId: content.postId,
            }
            
            await this.postEventUsecase.viewed(data)
            channel.ack(msg)
                        
        })
    }
}
