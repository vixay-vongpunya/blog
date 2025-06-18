import {createClient, RedisClientType} from "redis";

class Redis{
    private client: RedisClientType;
    async initialize(){
        this.client = createClient({url: process.env.REDIS_URL})
        this.client.on("error", error => console.log(error))
        await this.client.connect()
    }

    async setPostSearchIds(sessionId: string, data: string){
        await this.client.set(`search:user:${sessionId}`, data)
    }

    async getPostSearchIds(sessionId: string){
        const data = await this.client.get(`search:user:${sessionId}`)
        console.log("cached", data)
        return data
    }
}

const cacheClient = new Redis()
export default cacheClient