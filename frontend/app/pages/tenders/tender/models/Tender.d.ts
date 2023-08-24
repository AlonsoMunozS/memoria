import { TenderLocation } from "./TenderLocation";

export type Tender = {
        id: number
	    name: string
	    safi: string
	    province: string
	    commune: string
        address: string
	    location?: TenderLocation
	    createdAt: number
	    createdBy: number
	    currentStage: string
	    mercadoPublicoId: string
	    category?: string
	    companies?: Array<string>
};
