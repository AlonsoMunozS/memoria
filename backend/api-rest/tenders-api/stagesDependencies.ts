import { TenderStageCreator } from "../../context/tenders/stages/stage/application/create/tenderStageCreator";
import { StageByTenderFinder } from "../../context/tenders/stages/stage/application/findStagesByTender/StageByTenderFinder";
import { MongoTenderStagesRepository } from "../../context/tenders/stages/stage/infrastructure/mongo-tenderStage-repository";
import { CreateTenderStageController } from "./Stages/createTenderStageController";
import { FindStagesByTenderController } from "./Stages/findStagesByTenderController";

const tenderStageRepository = new MongoTenderStagesRepository();

const tenderStageCreator = new TenderStageCreator(tenderStageRepository)
const tenderStageFinder = new StageByTenderFinder(tenderStageRepository)

export const createTenderStageController = new CreateTenderStageController(tenderStageCreator);
export const findStageByTenderController = new FindStagesByTenderController(tenderStageFinder);