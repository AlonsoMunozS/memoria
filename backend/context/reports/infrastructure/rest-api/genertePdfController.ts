import { GenerateReportRequest } from "../../application/Generate/GenerateReportRequest";
import { ReportGenerator } from "../../application/Generate/ReportGenerator";
import { ReportConstructor } from "../../domain/ReportConstructor";
import { Request, Response } from "express";


export class GeneratePdfController {
  constructor(
    private readonly reportGenerator: ReportGenerator,
  ) { }



  async generatePDF(req: Request, res: Response) {


    const request: GenerateReportRequest = {
      reviewer: {
        id: "string",
        firstName: "string",
        lastName: "string",
      },
      undeterminedInfo: {
        explanation: "string"
      },
      observations: {
        lowQualityExam: {
          explanation: "string"
        },
        requiredComplementaryExams: {
          explanation: "string"
        },
        requiredFaceToFaceEvaluation: {
          explanation: "string"
        },
      },
      timestamps: {
        reservedAt: 123,
        diagnosedAt: 123
      }
      // id: "string",
      // createdAt: 1694542266,
      // reviewerName: "string",
      // examinerName: "string",
      // establishmentName: "string",
      // diagnosticMethod: "string",
      // reason: "string",
      // diagnosis: {},
      // lowQualityExam: {},
      // requiredComplementaryExams: {},
      // requiredFaceToFaceEvaluation: {
      //   explanation: "Expicacion"
      // }
    }

    try {
      await this.reportGenerator.run(request)
      res.status(200).send();
      return;
    } catch (error) {

    }

  }

}
