export type ReportPrimitives = {
	reviewer: {
		id?: string,
		firstName?: string,
		lastName?: string,
	},
	diagnosisInfo?: {
		diagnosis?: string,
		diagnosticBasis?: string,
		managementSuggestion?: string,
	},
	undeterminedInfo?: {
		explanation?: string
	},
	observations?: {
		lowQualityExam?: {
			explanation?: string
		},
		requiredComplementaryExams?: {
			explanation?: string
		},
		requiredFaceToFaceEvaluation?: {
			explanation?: string
		},
	},
	timestamps: {
		reservedAt: number,
		diagnosedAt: number
	}
}

export class Report {
	readonly reviewer: {
		id?: string,
		firstName?: string,
		lastName?: string,
	}
	readonly diagnosisInfo?: {
		diagnosis?: string,
		diagnosticBasis?: string,
		managementSuggestion?: string,
	}
	readonly undeterminedInfo?: {
		explanation?: string
	}
	readonly observations?: {
		lowQualityExam?: {
			explanation?: string
		},
		requiredComplementaryExams?: {
			explanation?: string
		},
		requiredFaceToFaceEvaluation?: {
			explanation?: string
		},
	}
	readonly timestamps: {
		reservedAt?: number,
		diagnosedAt?: number
	}

	constructor({
		reviewer,
		diagnosisInfo,
		undeterminedInfo,
		observations,
		timestamps,
	}: ReportPrimitives) {
		this.reviewer = reviewer;
		this.diagnosisInfo = diagnosisInfo;
		this.undeterminedInfo = undeterminedInfo;
		this.observations = observations;
		this.timestamps = timestamps;
	}

}
