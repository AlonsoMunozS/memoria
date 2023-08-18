export type CreateTenderRequest = {
	id: number,
	name: String,
	safi: String,
	province: string,
	commune: string,
	location?: Array<number>,
	createdAt: number,
	createdBy: number,
	currentStage: String,
	mercadoPublicoId: string,
	category?: string,
	companies?: Array<String>
}