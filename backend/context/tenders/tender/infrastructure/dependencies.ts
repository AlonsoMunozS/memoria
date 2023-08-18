import { TenderCreator } from "../application/create/tenderCreator";
import { TenderController } from "./rest-api/tenderController";
import { MongoTenderRepository } from "./tender-repository/mongo-tender-repository";

const tenderRepository = new MongoTenderRepository();

const tenderCreator = new TenderCreator(tenderRepository)

export const tenderController = new TenderController(tenderCreator);
