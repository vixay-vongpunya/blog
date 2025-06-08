import { PostEventPort } from "@root/src/application/Post/port/primary/PostEventPort"
import eventClient from "@root/src/infrastructure/events/RabbitMQService"
import { inject, injectable } from "tsyringe"

@injectable()
export class PostConsumer{
    constructor(@inject("PostEventUsecase") private postEventUsecase: PostEventPort){
    }

    async consume(){
        const channel = eventClient.getChannel()
        const postCreatedQueue = await channel.assertQueue("post.queue")
        await channel.bindQueue(postCreatedQueue.queue, "post.events", "post.created")

        channel.consume(postCreatedQueue.queue, async(msg: any) => {
            try{
                //by default msg content in rabbitMQ is buffer
                const content = JSON.parse(msg.content.toString())
                console.log("consumed", msg)
                const data = {
                    authorId: content.authorId,
                    title: content.title,
                    preview: content.preview,
                }
                
                await this.postEventUsecase.created(data)
    
                channel.ack(msg)

            }
            catch(error){
                console.log(error)
            }
            
        })
    }
}
