import { MongoClient } from "mongodb";

const uri: any = process.env.NEXT_PUBLIC_MONGODB_URI;
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}
client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
