import { TenderRepository } from "../../../../tender/domain/tenderRepository";
import { StagesFilesStorage } from "../../domain/StagesFilesStorage";
import { StageFileUploadRequest } from "./stageFilesUploadRequest";

export class StageFileUploader {
    constructor(
        private readonly stagesFilesStorage: StagesFilesStorage,
        private readonly tenderRepository: TenderRepository,

    ) { }

    async uploadStageFile(request: StageFileUploadRequest): Promise<void> {
        const tender = await this.tenderRepository.findById(request.tenderId)
        if (!tender) {
            console.log('TenderNotFound')
            throw new Error('TenderNotFound')
        }
        await this.stagesFilesStorage.upload(request.tenderId, request.stageName, request.fileName, request.file)
        // await this.notificationSender.sendNotification({
        //   id: tender.id,
        //   role: "admin",
        //   type: "createTender"
        // })

    }
}
