import { MongoClient } from "mongodb";
const MONGO_URI = "mongodb+srv://user:admin@cluster0.6khayld.mongodb.net/?appName=Cluster0";
const DB_NAME = "users";

const client = new MongoClient(MONGO_URI);
const dbConnect = async () => {
    try {
        await client.connect();
        console.log("MongoDB is connected successfully.");
        return  client.db(DB_NAME);
    } catch (error) {
        console.log("DB connection Error", error.message);
    }
}
dbConnect();
export default dbConnect;