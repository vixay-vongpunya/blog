
import {MongoClient} from "mongodb"
// this client is for advanced query
const mongoClient = new MongoClient(process.env.DATABASE_CONNECTION_STRING);
mongoClient.connect();
console.log(process.env.DATABASE_CONNECTION_STRING)

export default mongoClient;