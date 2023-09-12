import express from "express";

import { generateReportController } from "../dependencies";

const pdfRouter = express.Router();

pdfRouter.post(
  "/create",
  generateReportController.generatePDF.bind(generateReportController)
);


export { pdfRouter };
