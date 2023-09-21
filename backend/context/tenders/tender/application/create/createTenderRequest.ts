import { TenderLocation } from "../../domain/tenderLocation"

export type CreateTenderRequest = {
	id: number,
	name: string,
	safi: string,
	province: string,
	commune: string,
	address: string,
	location?: TenderLocation,
	createdAt: number,
	createdBy: number,
	currentStage: number,
	mercadoPublicoId: string,
	category?: string,
	companies?: Array<string>
}