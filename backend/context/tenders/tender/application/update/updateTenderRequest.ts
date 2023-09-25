import { TenderLocation } from "../../domain/tenderLocation"

export type UpdateTenderRequest = {
	id: number,
	name?: string,
	safi?: string,
	province?: string,
	commune?: string,
	address?: string,
	location?: TenderLocation,
	currentStage?: number,
	mercadoPublicoId?: string,
	category?: string,
}