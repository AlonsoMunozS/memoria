import { TenderRepository } from "../../../../tender/domain/tenderRepository";
import { TenderFilesStorage } from "../../domain/TenderFilesStorage";
import { TenderFilesUploadRequest } from "./tenderFilesUploadRequest";

export class TenderFilesUploader {
    constructor(
        private readonly tenderFilesStorage: TenderFilesStorage,
        private readonly tenderRepository: TenderRepository,

    ) { }

    async uploadTenderFile(request: TenderFilesUploadRequest): Promise<void> {
        const tender = await this.tenderRepository.findById(request.tenderId)
        if (!tender) {
            console.log('TenderNotFound')
            throw new Error('TenderNotFound')
        }
        await this.tenderFilesStorage.upload(request.tenderId, request.fileName, request.file)
        // await this.notificationSender.sendNotification({
        //   id: tender.id,
        //   role: "admin",
        //   type: "createTender"
        // })

    }
}
