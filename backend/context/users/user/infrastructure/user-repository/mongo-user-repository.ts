import { MongoClient, ServerApiVersion } from "mongodb"
import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/user";

const uri = "mongodb://Alonso:1234Alonso@ac-ouxjhz4-shard-00-00.q41p8o6.mongodb.net:27017,ac-ouxjhz4-shard-00-01.q41p8o6.mongodb.net:27017,ac-ouxjhz4-shard-00-02.q41p8o6.mongodb.net:27017/?replicaSet=atlas-8gtwdq-shard-0&authSource=admin&tls=true";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const database = client.db("PruebaPMM");
const collectionName = "Users";

export class MongoUserRepository implements UserRepository {

  async findById(userId: string): Promise<User> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      // const document = await collection.findOne({ _id: objectId });
      const userFound = await collection.findOne({ id: userId });
      if (!userFound) {
        throw new Error("UserNotFound")
      }
      const user = new User({
        id: userFound?.userId,
        createAt: userFound?.createAt,
        email: userFound?.email,
        rut: userFound?.rut,
        userPermits: userFound?.userPermits
      });
      return user;
    } finally {
      await client.close();
    }
  }
}