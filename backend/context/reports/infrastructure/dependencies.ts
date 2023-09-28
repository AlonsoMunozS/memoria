
import { ReportGenerator } from "../application/Generate/ReportGenerator";
import { PdfKitReportConstructor } from "./PdfKitReportConstructor";
import { GeneratePdfController } from "./rest-api/genertePdfController";


const pdf = new PdfKitReportConstructor;

const reportGenerator = new ReportGenerator(pdf)


export const generateReportController = new GeneratePdfController(reportGenerator);


