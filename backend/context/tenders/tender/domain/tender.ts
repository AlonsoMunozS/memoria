import { TenderLocation } from "./tenderLocation"

export class Tender {
	readonly id: number
	readonly name: String
	readonly safi: String
	readonly province: string
	readonly commune: string
	readonly location?: TenderLocation
	readonly createdAt: number
	readonly createdBy: number
	readonly currentStage: String
	readonly mercadoPublicoId: string
	readonly category?: string
	readonly companies?: Array<String>

	constructor({
        id,
        name,
        safi,
        province,
        commune,
        location,
        createdAt,
        createdBy,
        currentStage,
        mercadoPublicoId,
        category,
        companies
	}: {
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
	}) {
        this.id = id
        this.name = name
        this.safi = safi
        this.province = province
        this.commune = commune
        this.location = location
        this.createdAt = createdAt
        this.createdBy = createdBy
        this.currentStage = currentStage
        this.mercadoPublicoId = mercadoPublicoId
        this.category = category
        this.companies = companies 
	}

}