import { TenderLocation } from "../../domain/tenderLocation"

export type CreateTenderRequest = {
	id: number,
	name: String,
	safi: String,
	province: string,
	commune: string,
	location?: TenderLocation,
	createdAt: number,
	createdBy: number,
	currentStage: String,
	mercadoPublicoId: string,
	category?: string,
	companies?: Array<String>
}