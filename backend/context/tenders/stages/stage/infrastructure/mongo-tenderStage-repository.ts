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

  async findStageByTender(tenderId: number): Promise<Array<TenderStage> | null> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      const tenderStageFound = await collection.find({ tenderId: tenderId });
      if (!tenderStageFound) {
        throw new Error("TenderStageNotFound");
      }
      const tenderStagesArray = await tenderStageFound.toArray();
      const mappedTenderStages: TenderStage[] = tenderStagesArray.map((tenderStageDoc: any) => {
        return new TenderStage({
          id: tenderStageDoc.id,
          tenderId: tenderStageDoc.tenderId,
          name: tenderStageDoc.name,
          toDate: tenderStageDoc.toDate,
          files: tenderStageDoc?.files,
          lastModifiedBy: tenderStageDoc?.lastModifiedBy,
          lastModifiedAt: tenderStageDoc?.lastModifiedAt,
          createdAt: tenderStageDoc.createdAt,
          createdBy: tenderStageDoc.createdBy,
          comments: tenderStageDoc?.comments,
        })
      });
      return mappedTenderStages;
    } catch (error: any) {
      console.log(error)
      const errorMessage: string = error.message;
      throw errorMessage; // Throw the error to be caught by the caller
    } finally {
      await client.close();
    }
  }

}