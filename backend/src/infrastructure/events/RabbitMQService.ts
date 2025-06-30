import amqplib, { Channel, ChannelModel} from "amqplib"

class RabbitMQService{
    private channelModel!: ChannelModel;
    private channel!: Channel;

    async initialize():Promise<void>{
        this.channelModel = await amqplib.connect(process.env.RABBITMQ_URL);
        this.channel = await this.channelModel.createChannel();
        //(exchange name, exchange type)
        this.channel.assertExchange("post.events", "direct", {durable: true})
        this.channel.assertExchange("user.events", "direct", {durable: true})
    }

    async publish(exchange: string, routingKey: string, payload: any): Promise<void>{
        console.log(exchange, routingKey)
        this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)))
    }

    getChannel(): Channel{
        return this.channel
    }
}

const eventClient = new RabbitMQService()
export default eventClient