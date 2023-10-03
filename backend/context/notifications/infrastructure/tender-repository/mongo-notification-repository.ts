import { MongoClient, ServerApiVersion } from "mongodb"
import mongoConf from "../../../shared/infrastructure/config.local"
import { NotificationRepository } from "../../domain/notificationRepository";
import { Notification } from "../../domain/notification";

const uri = mongoConf.mongoUri
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const database = client.db("PruebaPMM");
const collectionName = "Notifications";

export class MongoNotificationRepository implements NotificationRepository {

  async create(notifications: Array<Notification>): Promise<void> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      await collection.insertMany(notifications);
    } finally {
      await client.close();
    }
  }
}