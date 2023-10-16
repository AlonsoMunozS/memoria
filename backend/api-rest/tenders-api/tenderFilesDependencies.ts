import { TenderFilesUploader } from "../../context/tenders/stages/stages-files/application/upload/tenderFilesUploader";
import { FirebaseStageTenderStorage } from "../../context/tenders/stages/stages-files/infrastructure/firebase-tender-file-storage";
import { MongoTenderRepository } from "../../context/tenders/tender/infrastructure/mongo-tender-repository";
import { UploadTenderFileController } from "./tender-files/uploadTenderFileController";

const tenderFilesStorage = new FirebaseStageTenderStorage()
const tenderRepository = new MongoTenderRepository()

const tenderFilesUploader = new TenderFilesUploader(tenderFilesStorage, tenderRepository)

export const uploadTenderFileController = new UploadTenderFileController(tenderFilesUploader);