import amqplib, { Channel, ChannelModel} from "amqplib"

class RabbitMQService{
    private channelModel!: ChannelModel;
    private channel!: Channel;

    async initialize():Promise<void>{
        this.channelModel = await amqplib.connect(process.env.RABBITMQ_URL);
        this.channel = await this.channelModel.createChannel();
        this.channel.assertExchange("post.events", "direct", {durable: true})
    }

    async publish(exchange: string, type: string, payload: any): Promise<void>{
        console.log("post.created in", payload)
        this.channel.publish(exchange, type, Buffer.from(JSON.stringify(payload)))
    }

    getChannel(): Channel{
        return this.channel
    }
}

const eventClient = new RabbitMQService()
export default eventClient