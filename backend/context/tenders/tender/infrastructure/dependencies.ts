import { MongoNotificationRepository } from "../../../notifications/infrastructure/tender-repository/mongo-notification-repository";
import { MongoUserRepository } from "../../../users/user/infrastructure/user-repository/mongo-user-repository";
import { TenderCreator } from "../application/create/tenderCreator";
import { TendersFinder } from "../application/find/tendersFinder";
import { TenderByIdFinder } from "../application/findById/tenderByIdFinder";
import { TenderRemover } from "../application/remove/tenderRemover";
import { TenderUpdater } from "../application/update/tenderUpdater";
import { CreateTenderController } from "./rest-api/createTenderController";
import { FindByIdTenderController } from "./rest-api/findByIdTenderController";
import { FindTendersController } from "./rest-api/findTendersController";
import { RemoveTenderController } from "./rest-api/removerTenderController";
import { UpdateTenderController } from "./rest-api/updateTenderController";
import { MongoTenderRepository } from "./tender-repository/mongo-tender-repository";

const tenderRepository = new MongoTenderRepository();
const notificationRepository = new MongoNotificationRepository();
const userRepository = new MongoUserRepository();

const tenderCreator = new TenderCreator(tenderRepository, notificationRepository, userRepository)
const tendersFinder = new TendersFinder(tenderRepository)
const tenderByIdFinder = new TenderByIdFinder(tenderRepository)
const tenderRemover = new TenderRemover(tenderRepository)
const tenderUpdater = new TenderUpdater(tenderRepository)


export const createTenderController = new CreateTenderController(tenderCreator);
export const findTendersController = new FindTendersController(tendersFinder);
export const findByIdTenderController = new FindByIdTenderController(tenderByIdFinder)
export const removeTenderController = new RemoveTenderController(tenderRemover)
export const updateTenderController = new UpdateTenderController(tenderUpdater)


