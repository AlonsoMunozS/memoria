import { TenderLocation } from "./tenderLocation"

export class Tender {
        readonly id: number
        readonly name: string
        readonly safi: string
        readonly region: string
        readonly province: string
        readonly commune: string
        readonly address: string
        readonly createdAt: number
        readonly createdBy: string
        readonly currentStage: number
        readonly mercadoPublicoId: string
        readonly category?: string
        readonly companies?: Array<string>

        constructor({
                id,
                name,
                safi,
                region,
                province,
                commune,
                address,
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
                region: string,
                province: string,
                commune: string,
                address: string,
                createdAt: number,
                createdBy: string,
                currentStage: number,
                mercadoPublicoId: string,
                category?: string,
                companies?: Array<string>
        }) {
                this.id = id
                this.name = name
                this.safi = safi
                this.region = region
                this.province = province
                this.commune = commune
                this.address = address
                this.createdAt = createdAt
                this.createdBy = createdBy
                this.currentStage = currentStage
                this.mercadoPublicoId = mercadoPublicoId
                this.category = category
                this.companies = companies
        }

}