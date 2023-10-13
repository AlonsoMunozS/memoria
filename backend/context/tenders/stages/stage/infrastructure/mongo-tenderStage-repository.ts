import { TenderStageRepository } from "../domain/tenderStageRepository";
import { MongoClient, ServerApiVersion } from "mongodb"
import config from '../../../../shared/infrastructure/config.local'
import { TenderStage } from "../domain/TenderStage";

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
const collectionName = "TenderStages";

const removeUndefinedValues = (objeto: { [key: string]: any }): void => {
  for (const clave in objeto) {
    if (objeto.hasOwnProperty(clave) && objeto[clave] === undefined) {
      delete objeto[clave];
    }
  }
};

export class MongoTenderStagesRepository implements TenderStageRepository {


  async create(tenderStage: TenderStage): Promise<void> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      removeUndefinedValues(tenderStage)
      await collection.insertOne(tenderStage);
    } catch (error: any) {
      console.log(error)
      const errorMessage: string = error.message;
      throw errorMessage; // Throw the error to be caught by the caller
    } finally {
      await client.close();
    }
  }

  async findStageByTender(tenderId: number, stageName: string): Promise<TenderStage | null> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      const tenderStageFound = await collection.findOne({ tenderId: tenderId, name: stageName });
      if (!tenderStageFound) {
        throw new Error("TenderStageNotFound");
      }
      const tenderStage = new TenderStage({
        id: tenderStageFound.id,
        tenderId: tenderStageFound.tenderId,
        name: tenderStageFound.name,
        toDate: tenderStageFound.toDate,
        files: tenderStageFound?.files,
        lastModifiedBy: tenderStageFound?.lastModifiedBy,
        lastModifiedAt: tenderStageFound?.lastModifiedAt,
        createdAt: tenderStageFound.createdAt,
        createdBy: tenderStageFound.createdBy,
        comments: tenderStageFound?.comments,
      })
      return tenderStage;
    } catch (error: any) {
      console.log(error)
      const errorMessage: string = error.message;
      throw errorMessage; // Throw the error to be caught by the caller
    } finally {
      await client.close();
    }
  }

}