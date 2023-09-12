export type ReportPrimitives = {
	id: string;
	createdAt: number;
	reviewerName: string;
	examinerName: string;
	establishmentName: string;
	diagnosticMethod: string;
	reason: string;
	clinicalManagementSuggestion: string
	diagnosis: string,
	diagnosticBasis: string,
	requiredFaceToFaceEvaluation: boolean,
	reviewerSignature?: string,
}

export class Report {
	readonly id: string;
	readonly createdAt: number;
	readonly reviewerName: string;
	readonly examinerName: string;
	readonly establishmentName: string;
	readonly diagnosticMethod: string;
	readonly reason: string;
	readonly clinicalManagementSuggestion: string
	readonly diagnosis: string;
	readonly diagnosticBasis: string;
	readonly requiredFaceToFaceEvaluation: boolean;
	readonly reviewerSignature?: string;

	constructor({
		id,
		createdAt,
		reviewerName,
		examinerName,
		establishmentName,
		diagnosticMethod,
		reason,
		clinicalManagementSuggestion,
		diagnosis,
		diagnosticBasis,
		requiredFaceToFaceEvaluation,
		reviewerSignature,
	}: {
		id: string,
		createdAt: number,
		reviewerName: string,
		examinerName: string,
		establishmentName: string,
		diagnosticMethod: string,
		reason: string,
		clinicalManagementSuggestion: string,
		diagnosis: string,
		diagnosticBasis: string,
		requiredFaceToFaceEvaluation: boolean,
		reviewerSignature?: string,
	}) {
		this.id = id;
		this.createdAt = createdAt;
		this.reviewerName = reviewerName;
		this.examinerName = examinerName;
		this.establishmentName = establishmentName;
		this.diagnosticMethod = diagnosticMethod;
		this.reason = reason;
		this.clinicalManagementSuggestion = clinicalManagementSuggestion;
		this.diagnosis = diagnosis;
		this.diagnosticBasis = diagnosticBasis;
		this.requiredFaceToFaceEvaluation = requiredFaceToFaceEvaluation;
		this.reviewerSignature = reviewerSignature;
	}

}
