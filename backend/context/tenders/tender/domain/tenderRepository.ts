import { Tender } from "./tender"

export interface TenderRepository {
	create(tender: Tender): Promise<void>;
}

