import cron from "node-cron"
import eventClient from "../events/RabbitMQService"

const exchangeKey = 'post.events'

async function start(){
    await eventClient.initialize();
    cron.schedule('* * * * *',async()=>{
        try{
            await eventClient.publish(exchangeKey, 'post.viewed', '')
            console.log("done first round")
        }
        catch(error){
            console.log(error)
        }
        
    })
}

start();