import {createClient, RedisClientType} from "redis";

class Redis{
    private client: RedisClientType;
    async initialize(){
        this.client = createClient({url: process.env.REDIS_URL})
        this.client.on("error", error => console.log(error))
        await this.client.connect()
        console.log("redis connection successful")
    }

    async setPostSearchIds(sessionId: string, data: string){
        await this.client.set(`user:${sessionId}:search`, data)
    }

    async getPostSearchIds(sessionId: string){
        const data = await this.client.get(`user:${sessionId}:search`)
        console.log("cached", data)
        return data as string
    }

    async setUserFeedIds(sessionId: string, data: string){
        await this.client.set(`user:${sessionId}:feed`, data)
    }

    async getUserFeedIds(sessionId: string){
        const data = await this.client.get(`user:${sessionId}:feed`)
        console.log("cached data", data)
        return data as string
    }

    async setViewedPostCount(userId: string){
        //frist set will make this 0
        await this.client.incr(`user:${userId}:viewCount`)
    }

    async resetViewedPostCount(userId: string){
        await this.client.set(`user:${userId}:viewCount`, 0)
    }

    async getViewedPostCount(userId: string){
        const data = await this.client.get(`user:${userId}:viewCount`) as string
        console.log("data viewed", data)
        return parseInt(data)
    }

    async setFollowingAuthorIds(sessionId: string, data: string){
        await this.client.set(`user:${sessionId}:following`, data)
    }

    async getFollowingAuthorIds(sessionId: string){
        const data = await this.client.get(`user:${sessionId}:following`)
        console.log("following", data)
        return data as string
    }

}

const cacheClient = new Redis()
export default cacheClient