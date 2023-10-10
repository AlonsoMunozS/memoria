import { Tender } from "../domain/tender";
import { TenderRepository } from "../domain/tenderRepository";
import { MongoClient, ServerApiVersion } from "mongodb"
import config from '../../../shared/infrastructure/config.local'

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
const collectionName = "Tenders";

export class MongoTenderRepository implements TenderRepository {

  async create(tender: Tender): Promise<void> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      await collection.insertOne(tender);
    } catch (error: any) {
      console.log(error)
      const errorMessage: string = error.message;
      throw errorMessage; // Throw the error to be caught by the caller
    } finally {
      await client.close();
    }
  }
  async find(): Promise<Array<Tender>> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      const tendersCursor = collection.find({});
      const tendersArray = await tendersCursor.toArray();
      const mappedTenders: Tender[] = tendersArray.map((tenderDoc: any) => {
        return new Tender({
          id: tenderDoc.id,
          name: tenderDoc.name,
          safi: tenderDoc.safi,
          region: tenderDoc.region,
          province: tenderDoc.province,
          commune: tenderDoc.commune,
          address: tenderDoc.address,
          createdAt: tenderDoc.createdAt,
          createdBy: tenderDoc.createdBy,
          currentStage: tenderDoc.currentStage,
          mercadoPublicoId: tenderDoc.mercadoPublicoId,
          category: tenderDoc.category,
          companies: tenderDoc.companies
        });
      });
      return mappedTenders;
    } finally {
      await client.close();
    }
  }

  async findById(tenderId: number): Promise<Tender | null> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      // const document = await collection.findOne({ _id: objectId });
      const tenderFound = await collection.findOne({ id: tenderId });
      if (!tenderFound) {
        return null
      }
      const tender = new Tender({
        id: tenderFound.id,
        name: tenderFound.name,
        safi: tenderFound.safi,
        region: tenderFound.region,
        province: tenderFound.province,
        commune: tenderFound.commune,
        address: tenderFound.address,
        createdAt: tenderFound.createdAt,
        createdBy: tenderFound.createdBy,
        currentStage: tenderFound.currentStage,
        mercadoPublicoId: tenderFound.mercadoPublicoId,
        category: tenderFound.category,
        companies: tenderFound.companies
      });
      return tender;
    } finally {
      await client.close();
    }
  }
  async remove(tenderId: number): Promise<void> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      await collection.deleteOne({ id: tenderId });
    } finally {
      await client.close();
    }
  }

  async update(updatedTender: Tender): Promise<void> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      const filter = { id: updatedTender.id };

      await collection.updateOne(filter, { $set: updatedTender });
    } finally {
      await client.close();
    }
  }


}