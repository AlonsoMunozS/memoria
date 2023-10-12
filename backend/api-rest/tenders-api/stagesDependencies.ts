import { TenderStageCreator } from "../../context/tenders/stages/application/create/tenderStageCreator";
import { MongoTenderStagesRepository } from "../../context/tenders/stages/infrastructure/mongo-tenderStage-repository";
import { CreateTenderStageController } from "./Stages/createTenderStageController";

const tenderStageRepository = new MongoTenderStagesRepository();

const tenderStageCreator = new TenderStageCreator(tenderStageRepository)

export const createTenderStageController = new CreateTenderStageController(tenderStageCreator);