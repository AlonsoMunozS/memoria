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
      const collection = database.collection(collectionName);
      await collection.insertOne(tender);
    }finally{
      await client.close();
    }
  }
  async find(): Promise<Array<Tender>> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      const tendersCursor = collection.find({});
      const tendersArray = await tendersCursor.toArray();
      console.log(tendersArray)
      const mappedTenders: Tender[] = tendersArray.map((tenderDoc: any) => {
        return new Tender({   
          id:tenderDoc.id,
          name:tenderDoc.name,
          safi:tenderDoc.safi,
          province:tenderDoc.province,
          commune:tenderDoc.commune,
          address:tenderDoc.address,
          location:tenderDoc.location,
          createdAt:tenderDoc.createdAt,
          createdBy:tenderDoc.createdBy,
          currentStage:tenderDoc.currentStage,
          mercadoPublicoId:tenderDoc.mercadoPublicoId,
          category:tenderDoc.category,
          companies:tenderDoc.companies});
      });
      return mappedTenders;
    }finally{
      await client.close();
    }
  }

  async findById(tenderId : number): Promise<Tender> {
    try {
      await client.connect();
      const collection = database.collection(collectionName);
      // const document = await collection.findOne({ _id: objectId });
      const tenderFound = await collection.findOne({ id: tenderId });
      const tender = new Tender({   
        id: tenderFound?.id,
        name: tenderFound?.name,
        safi: tenderFound?.safi,
        province: tenderFound?.province,
        commune: tenderFound?.commune,
        address: tenderFound?.address,
        location: tenderFound?.location,
        createdAt: tenderFound?.createdAt,
        createdBy: tenderFound?.createdBy,
        currentStage: tenderFound?.currentStage,
        mercadoPublicoId: tenderFound?.mercadoPublicoId,
        category: tenderFound?.category,
        companies: tenderFound?.companies});
      return tender;
    }finally{
      await client.close();
    }
  }
}
