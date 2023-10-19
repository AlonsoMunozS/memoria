import { StageFileUploader } from "../../context/tenders/stages/stages-files/application/upload/stageFileUploader";
import { FirebaseStageFilesStorage } from "../../context/tenders/stages/stages-files/infrastructure/firebase-stages-files-storage";
import { MongoTenderRepository } from "../../context/tenders/tender/infrastructure/mongo-tender-repository";
import { UploadStageFileController } from "./Stages-files/uploadStageFileController";

const stageFilesStorage = new FirebaseStageFilesStorage()
const tenderRepository = new MongoTenderRepository()

const stageFilesUploader = new StageFileUploader(stageFilesStorage, tenderRepository)

export const uploadStageFileController = new UploadStageFileController(stageFilesUploader);