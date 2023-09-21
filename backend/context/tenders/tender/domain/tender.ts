import { TenderLocation } from "./tenderLocation"

export class Tender {
        readonly id: number
        readonly name: string
        readonly safi: string
        readonly province: string
        readonly commune: string
        readonly address: string
        readonly location?: TenderLocation
        readonly createdAt: number
        readonly createdBy: number
        readonly currentStage: number
        readonly mercadoPublicoId: string
        readonly category?: string
        readonly companies?: Array<string>

        constructor({
                id,
                name,
                safi,
                province,
                commune,
                address,
                location,
                createdAt,
                createdBy,
                currentStage,
                mercadoPublicoId,
                category,
                companies
        }: {
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
        }) {
                this.id = id
                this.name = name
                this.safi = safi
                this.province = province
                this.commune = commune
                this.address = address
                this.location = location
                this.createdAt = createdAt
                this.createdBy = createdBy
                this.currentStage = currentStage
                this.mercadoPublicoId = mercadoPublicoId
                this.category = category
                this.companies = companies
        }

}