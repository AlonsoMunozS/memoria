import { Tender } from "./tender"

export interface TenderRepository {
	create(tender: Tender): Promise<void>;
	find(): Promise<Array<Tender>>;
	findById(tenderId: number): Promise<Tender | null>;
	remove(tenderId: number): Promise<void>;
	update(updatedTender: Tender): Promise<void>;
}

