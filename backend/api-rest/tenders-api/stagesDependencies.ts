import { TenderStageCreator } from "../../context/tenders/stages/stage/application/create/tenderStageCreator";
import { StageByTenderFinder } from "../../context/tenders/stages/stage/application/findByTender/StageByTenderFinder";
import { MongoTenderStagesRepository } from "../../context/tenders/stages/infrastructure/mongo-tenderStage-repository";
import { CreateTenderStageController } from "./Stages/createTenderStageController";
import { FindStageByTenderController } from "./Stages/findStageByTenderController";

const tenderStageRepository = new MongoTenderStagesRepository();

const tenderStageCreator = new TenderStageCreator(tenderStageRepository)
const tenderStageFinder = new StageByTenderFinder(tenderStageRepository)

export const createTenderStageController = new CreateTenderStageController(tenderStageCreator);
export const findStageByTenderController = new FindStageByTenderController(tenderStageFinder);