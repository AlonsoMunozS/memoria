import { TenderCreator } from "../application/create/tenderCreator";
import { TendersFinder } from "../application/find/tendersFinder";
import { CreateTenderController } from "./rest-api/createTenderController";
import { FindTendersController } from "./rest-api/findTendersController";
import { MongoTenderRepository } from "./tender-repository/mongo-tender-repository";

const tenderRepository = new MongoTenderRepository();

const tenderCreator = new TenderCreator(tenderRepository)
const tendersFinder = new TendersFinder(tenderRepository)

export const createTenderController = new CreateTenderController(tenderCreator);
export const findTenderController = new FindTendersController(tendersFinder);
