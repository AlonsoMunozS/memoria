import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as admin from "firebase-admin";
import { StageCommentsRepository } from "../domain/StageCommentsRepository";
import { Comment } from "../domain/Comment";
import config from '../../../../shared/infrastructure/config.local'
import { MongoClient, ServerApiVersion } from "mongodb";
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
const collectionName = "TenderStageComments";

export class MongoStageCommentsRepository implements StageCommentsRepository {

  async create(comment: Comment): Promise<void> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      await collection.insertOne(comment);
    } catch (error: any) {
      console.log(error)
      const errorMessage: string = error.message;
      throw errorMessage; // Throw the error to be caught by the caller
    } finally {
      await client.close();
    }
  }
  async findByStage(stageId: number): Promise<Array<Comment>> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      const stageCommentsCursor = collection.find({ stageId: stageId });
      const stageCommentsArray = await stageCommentsCursor.toArray();
      const mappedStageComments: Comment[] = stageCommentsArray.map((stageCommentDoc: any) => {
        return new Comment({
          stageId: stageCommentDoc.stageId,
          post: stageCommentDoc.post,
          createdAt: stageCommentDoc.createdAt,
          createdBy: stageCommentDoc.createdBy,
        });
      });
      return mappedStageComments;
    } finally {
      await client.close();
    }
  }
}