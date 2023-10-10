type Permits = {
    create: Boolean,
    remove: Boolean,
    update: Boolean,
    read: Boolean,
}

export class UserPermits {
    readonly tenders?: Permits
    readonly contracts?: Permits
    readonly companies?: Permits

    constructor({
        tenders,
        contracts,
        companies
    }: {
        tenders?: Permits,
        contracts?: Permits,
        companies?: Permits,
    }) {
        this.tenders = tenders
        this.contracts = contracts
        this.companies = companies

    }
}
