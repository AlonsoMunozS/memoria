import { TenderCreator } from "../application/create/tenderCreator";
import { TendersFinder } from "../application/find/tendersFinder";
import { TenderByIdFinder } from "../application/findById/tenderByIdFinder";
import { CreateTenderController } from "./rest-api/createTenderController";
import { FindByIdTenderController } from "./rest-api/findByIdTenderController";
import { FindTendersController } from "./rest-api/findTendersController";
import { MongoTenderRepository } from "./tender-repository/mongo-tender-repository";

const tenderRepository = new MongoTenderRepository();

const tenderCreator = new TenderCreator(tenderRepository)
const tendersFinder = new TendersFinder(tenderRepository)
const tenderByIdFinder = new TenderByIdFinder(tenderRepository)

export const createTenderController = new CreateTenderController(tenderCreator);
export const findTendersController = new FindTendersController(tendersFinder);
export const findByIdTenderController = new FindByIdTenderController(tenderByIdFinder)
