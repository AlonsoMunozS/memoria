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
        userPermits: userFound?.userPermits,
        role: userFound?.role
      });
      return user;
    } finally {
      await client.close();
    }
  }
  async findByRole(role: string): Promise<Array<User>> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      // const document = await collection.findOne({ _id: objectId });
      const usersCursor = collection.find({ role: role });
      const usersArray = await usersCursor.toArray();
      const mappedUser: User[] = usersArray.map((userDoc: any) => {
        return new User({
          id: userDoc?.id,
          email: userDoc?.email,
          createAt: userDoc?.createAt,
          role: userDoc?.role,
          rut: userDoc?.rut,
          userPermits: userDoc?.userPermits
        });
      });
      console.log("mapperUser:", mappedUser)
      return mappedUser;
    } finally {
      await client.close();
    }
  }
}