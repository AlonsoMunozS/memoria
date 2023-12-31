import { TenderCreator } from "../../context/tenders/tender/application/create/tenderCreator";
import { TendersFinder } from "../../context/tenders/tender/application/find/tendersFinder";
import { TenderByIdFinder } from "../../context/tenders/tender/application/findById/tenderByIdFinder";
import { TenderRemover } from "../../context/tenders/tender/application/remove/tenderRemover";
import { TenderRequesterRemove } from "../../context/tenders/tender/application/requestRemove/tenderRequesterRemove";
import { TenderUpdater } from "../../context/tenders/tender/application/update/tenderUpdater";
import { MongoTenderRepository } from "../../context/tenders/tender/infrastructure/mongo-tender-repository";
import { notificationSender } from "../notifications-api/notificationsDependencies";
import { CreateTenderController } from "./Tender/createTenderController";
import { FindByIdTenderController } from "./Tender/findByIdTenderController";
import { FindTendersController } from "./Tender/findTendersController";
import { RemoveTenderController } from "./Tender/removerTenderController";
import { RequestRemoveTenderController } from "./Tender/requestRemoveTenderController";
import { UpdateTenderController } from "./Tender/updateTenderController";

const tenderRepository = new MongoTenderRepository();

const tenderCreator = new TenderCreator(tenderRepository, notificationSender)
const tendersFinder = new TendersFinder(tenderRepository)
const tenderByIdFinder = new TenderByIdFinder(tenderRepository)
const tenderRemover = new TenderRemover(tenderRepository, notificationSender)
const tenderRequesterRemove = new TenderRequesterRemove(tenderRepository, notificationSender)
const tenderUpdater = new TenderUpdater(tenderRepository)


export const createTenderController = new CreateTenderController(tenderCreator);
export const findTendersController = new FindTendersController(tendersFinder);
export const findByIdTenderController = new FindByIdTenderController(tenderByIdFinder)
export const removeTenderController = new RemoveTenderController(tenderRemover)
export const updateTenderController = new UpdateTenderController(tenderUpdater)
export const requestRemoveTenderController = new RequestRemoveTenderController(tenderRequesterRemove)



