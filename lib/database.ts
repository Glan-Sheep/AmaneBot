import { MongoClient } from "mongo";
import { config } from "dotenv";

const env = config();

const client = new MongoClient();

await client.connect(env["MONGO_URL"]);

export default client;