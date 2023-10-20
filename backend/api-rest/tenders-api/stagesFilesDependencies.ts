import { FilesNameByStageFinder } from "../../context/tenders/stages/stages-files/application/findFilesNameByStage/filesNameByStageFinder";
import { StageFileUploader } from "../../context/tenders/stages/stages-files/application/upload/stageFileUploader";
import { FirebaseStageFilesStorage } from "../../context/tenders/stages/stages-files/infrastructure/firebase-stages-files-storage";
import { MongoTenderRepository } from "../../context/tenders/tender/infrastructure/mongo-tender-repository";
import { FindFileNameByStageController } from "./Stages-files/findFilesNameByStageController";
import { UploadStageFileController } from "./Stages-files/uploadStageFileController";

const stageFilesStorage = new FirebaseStageFilesStorage()
const tenderRepository = new MongoTenderRepository()

const stageFilesUploader = new StageFileUploader(stageFilesStorage, tenderRepository)
const fileNameByStageFinder = new FilesNameByStageFinder(stageFilesStorage)

export const uploadStageFileController = new UploadStageFileController(stageFilesUploader);
export const findFileNameByStageController = new FindFileNameByStageController(fileNameByStageFinder);