import { Tender } from "./tender"

export interface TenderRepository {
	create(tender: Tender): Promise<void>;
	find(): Promise<Array<Tender>>;
	findById(tenderId: number): Promise<Tender>;
}

