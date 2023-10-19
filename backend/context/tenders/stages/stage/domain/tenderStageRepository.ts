import { TenderStage } from "./TenderStage";

export interface TenderStageRepository {
	create(tenderStage: TenderStage): Promise<void>;
	findStageByTender(tenderId: number): Promise<Array<TenderStage> | null>;
	//findById(tenderId: number): Promise<Tender | null>;
	//update(updatedTender: Tender): Promise<void>;
}

