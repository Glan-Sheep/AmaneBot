import { MongoClient } from "mongo";

const client = new MongoClient();

// Connecting to a Local Database
await client.connect("mongodb://127.0.0.1:27017");

export default client;