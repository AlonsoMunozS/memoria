import { TenderLocation } from "./TenderLocation";

export type Tender = {
	id?: number
	name: string
	safi: string
	region?: string
	province?: string
	commune?: string
	address: string
	createdAt?: number
	createdBy?: number
	currentStage: number
	mercadoPublicoId: string
	category?: string
	companies?: Array<string>
};
