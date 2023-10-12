import { TenderStage } from "./TenderStage";

export interface TenderStageRepository {
	create(tenderStage: TenderStage): Promise<void>;
	//findById(tenderId: number): Promise<Tender | null>;
	//update(updatedTender: Tender): Promise<void>;
}

