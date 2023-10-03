import { MongoClient, ServerApiVersion } from "mongodb"
import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/user";
import { UserAttributes } from "../../domain/UserAttributes";
import config from '../../../../shared/infrastructure/config.local'

const uri = config.mongoUri
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

  async create(userId: string, userAttributes: UserAttributes): Promise<void> {
    const user = User.create({
      id: userId,
      userAttributes
    })
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      await collection.insertOne(user);
    } finally {
      await client.close();
    }
  }

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
  async findByRole(role: string): Promise<Array<string>> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      // const document = await collection.findOne({ _id: objectId });
      const usersFound = await collection.findOne({ role: role });
      const usersArray = await usersFound?.toArray();
      const mappedUsers: Array<string> = usersArray.map((userDoc: User) => {
        return userDoc.id
      });
      return mappedUsers;
    } finally {
      await client.close();
    }
  }
}