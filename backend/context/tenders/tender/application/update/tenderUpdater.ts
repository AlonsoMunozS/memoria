import { Tender } from "../../domain/tender";
import { TenderRepository } from "../../domain/tenderRepository";
import { UpdateTenderRequest } from "./updateTenderRequest";

export class TenderUpdater {
    constructor(
        private readonly tenderRepository: TenderRepository,
    ) { }

    async updateTender(request: UpdateTenderRequest): Promise<void> {
        const oldTender = await this.tenderRepository.findById(request.id)
        const updatedTender = new Tender({
            ...oldTender,
            id: request.id,
            name: request.name ? request.name : oldTender.name,
            safi: request.safi ? request.safi : oldTender.safi,
            region: request.region ? request.region : oldTender.region,
            province: request.province ? request.province : oldTender.province,
            commune: request.commune ? request.commune : oldTender.commune,
            address: request.address ? request.address : oldTender.address,
            currentStage: request.currentStage ? request.currentStage : oldTender.currentStage,
            mercadoPublicoId: request.mercadoPublicoId ? request.mercadoPublicoId : oldTender.mercadoPublicoId,
            category: request.category ? request.category : oldTender.category,
        })
        await this.tenderRepository.update(updatedTender);
    }
}
