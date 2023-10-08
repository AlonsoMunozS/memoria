import { MongoClient, ServerApiVersion } from "mongodb"
import mongoConf from "../../shared/infrastructure/config.local"
import { NotificationRepository } from "../domain/notificationRepository";
import { Notification } from "../domain/notification";

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
  async findByUser(userId: string): Promise<Array<Notification> | null> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      const notificationsCursor = collection.find({ userId: userId });
      if (!notificationsCursor) {
        return null
      }
      const notificationsArray = await notificationsCursor.toArray();
      const mappedNotifications: Notification[] = notificationsArray.map((notificationDoc) => {
        return new Notification({
          id: notificationDoc.id,
          userId: notificationDoc.userId,
          message: notificationDoc.message,
          createdAt: notificationDoc.createdAt,
          read: notificationDoc.read
        });
      });
      return mappedNotifications;
    } finally {
      await client.close();
    }
  }
}