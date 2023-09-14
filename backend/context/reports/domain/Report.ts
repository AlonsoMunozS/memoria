export type ReportPrimitives = {
	id: string;
	createdAt: number;
	reviewerName: string;
	examinerName: string;
	establishmentName: string;
	diagnosticMethod: string;
	reason: string;
	diagnosis?: {
		clinicalManagementSuggestion?: string
		explanation?: string,
		diagnosticBasis?: string
	}
	requiredFaceToFaceEvaluation?: {
		explanation?: string
	},
	reviewerSignature?: string,
	requiredComplementaryExams?: {
		explanation?: string
	}
	lowQualityExam?: {
		explanation?: string
	}

}

export class Report {
	readonly id: string;
	readonly createdAt: number;
	readonly reviewerName: string;
	readonly examinerName: string;
	readonly establishmentName: string;
	readonly diagnosticMethod: string;
	readonly reason: string;
	readonly reviewerSignature?: string;
	readonly diagnosis?: {
		clinicalManagementSuggestion?: string | undefined
		explanation?: string | undefined,
		diagnosticBasis?: string | undefined
	};
	readonly requiredFaceToFaceEvaluation?: {
		explanation?: string | undefined
	};
	readonly requiredComplementaryExams?: {
		explanation?: string | undefined
	};
	readonly lowQualityExam?: {
		explanation?: string | undefined
	}

	constructor({
		id,
		createdAt,
		reviewerName,
		examinerName,
		establishmentName,
		diagnosticMethod,
		reason,
		reviewerSignature,
		diagnosis,
		requiredFaceToFaceEvaluation,
		requiredComplementaryExams,
		lowQualityExam
	}: {
		id: string,
		createdAt: number,
		reviewerName: string,
		examinerName: string,
		establishmentName: string,
		diagnosticMethod: string,
		reason: string,
		reviewerSignature?: string,
		diagnosis?: {
			clinicalManagementSuggestion?: string | undefined
			explanation?: string | undefined,
			diagnosticBasis?: string | undefined
		}
		requiredFaceToFaceEvaluation?: {
			explanation?: string | undefined
		},
		requiredComplementaryExams?: {
			explanation?: string | undefined
		}
		lowQualityExam?: {
			explanation?: string | undefined
		}
	}) {
		this.id = id;
		this.createdAt = createdAt;
		this.reviewerName = reviewerName;
		this.examinerName = examinerName;
		this.establishmentName = establishmentName;
		this.diagnosticMethod = diagnosticMethod;
		this.reason = reason;
		this.diagnosis = {
			explanation: diagnosis?.explanation,
			clinicalManagementSuggestion: diagnosis?.clinicalManagementSuggestion,
			diagnosticBasis: diagnosis?.diagnosticBasis,
		};
		this.requiredFaceToFaceEvaluation = {
			explanation: requiredFaceToFaceEvaluation?.explanation
		}
		this.requiredComplementaryExams = {
			explanation: requiredComplementaryExams?.explanation
		}
		this.lowQualityExam = {
			explanation: lowQualityExam?.explanation
		}
	}

}
