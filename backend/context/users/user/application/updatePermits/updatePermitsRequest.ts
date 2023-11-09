export type UpdatePermitsRequest = {
	id: string,
	userPermits: {
		tenders?: {
			create: boolean,
			update: boolean,
			remove: boolean,
			read: boolean,
		},
	},
}