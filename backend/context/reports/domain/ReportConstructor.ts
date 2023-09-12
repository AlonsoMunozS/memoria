import { Report } from './Report';

export interface ReportConstructor {
	generate(report: Report): Promise<void>;
}