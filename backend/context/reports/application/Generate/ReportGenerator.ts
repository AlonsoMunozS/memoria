import { Report } from '../../domain/Report';
import { ReportConstructor } from '../../domain/ReportConstructor';
import { GenerateReportRequest } from './GenerateReportRequest';

export class ReportGenerator {
	constructor(
		private readonly generator: ReportConstructor,
	) { }
	async run(request: GenerateReportRequest): Promise<void> {
		console.log('ReportGenerator.run')
		const report = new Report(request);
		await this.generator.generate(report);
	}
}