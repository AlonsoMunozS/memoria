import { Tender } from "../../domain/tender";
import { TenderRepository } from "../../domain/tenderRepository";
import { MongoClient, ServerApiVersion } from "mongodb"

const uri = "mongodb+srv://Alonso:1234Alonso@pruebapmm.q41p8o6.mongodb.net/?retryWrites=true&w=majority";
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

  async create(tender : Tender): Promise<void> {
    try {
      await client.connect();
      const database = client.db("PruebaPMM");
      const collection = database.collection(collectionName);
      await collection.insertOne(tender);
    }finally{
      await client.close();
    }
  }
}
