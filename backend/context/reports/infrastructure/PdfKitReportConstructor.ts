import { GenerateReportRequest } from '../application/Generate/GenerateReportRequest';
import { ReportConstructor } from '../domain/ReportConstructor'

const PDFDocument = require('pdfkit');
const fs = require('fs');
const boldText = (text: string) => {
	return { text, bold: true }; // Define el texto en negrita usando el atributo 'bold'
};
export class PdfKitReportConstructor implements ReportConstructor {
	async generate(report: GenerateReportRequest) {
		const documentW = 595.28
		const documentH = 841.89

		const margins = {
			top: 50,
			left: 40,
			right: 40,
			bottom: 0
		}

		const doc = new PDFDocument({ margins, size: [documentW, documentH] })
		const stream = fs.createWriteStream('D:/Memoria/output.pdf');

		// Pipe the PDF document to the stream
		doc.pipe(stream);

		// Create document

		// doc.pipe(fs.createWriteStream('output.pdf'))

		// const getImage = (url: string): Promise<Buffer> => {
		// 	return new Promise((resolve, reject) => {
		// 		const httpModule = url.startsWith('https') ? https : http

		// 		httpModule
		// 			.get(url, res => {
		// 				const chunks: Array<Buffer> = []

		// 				res.on('data', (chunk: Buffer) => {
		// 					chunks.push(chunk)
		// 				})

		// 				res.on('end', () => {
		// 					resolve(Buffer.concat(chunks))
		// 				})
		// 			})
		// 			.on('error', err => {
		// 				reject(err)
		// 			})
		// 	})
		// }

		const formCheckbox = (x: number, y: number, isChecked: boolean) => {
			const checkboxSize = 12

			doc.lineWidth(1).fillColor('#0FAFB5').strokeColor('#666666').roundedRect(x, y, checkboxSize, checkboxSize, 1)

			if (isChecked) doc.fill()

			doc.stroke()

			if (isChecked) {
				doc
					.lineWidth(0.5)
					.strokeColor('#ffffff')
					.moveTo(x + 4, y + checkboxSize / 2)
					.lineTo(x + checkboxSize / 2 - 1, y + checkboxSize - 4)
					.lineTo(x + checkboxSize - 4, y + 3)
					.stroke()
			}
		}

		const formInput = (x: number, y: number, w: number, h: number, r: number, text: string, value?: string) => {
			doc.roundedRect(x, y, w, h, r).lineWidth(1).strokeColor('#EAEBEC').stroke()

			doc
				.moveTo(x + r, y)
				.lineTo(x + w / 2, y)
				.lineTo(x + w / 2, y + h)
				.lineTo(x + r, y + h)
				.quadraticCurveTo(x, y + h, x, y + h - r)
				.lineTo(x, y + r)
				.quadraticCurveTo(x, y, x + r, y)
				.fillColor('#EAEBEC')
				.fill()

			const widthOfText = doc.fontSize(10).widthOfString(text)
			doc
				.fontSize(10)
				.fillColor('#595959')
				.text(text, x + w / 2 - (widthOfText + 5), y + 9)

			if (value) {
				doc
					.fontSize(10)
					.fillColor('#000000')
					.text(value, x + w / 2 + 5, y + 9)
			}
		}
		const diagnosed = (isDiagnosed: boolean) => {
			if (isDiagnosed) {
				const y1 = formTextarea(290, 'Sugerencia diagnóstica', report.diagnosisInfo?.diagnosis)

				const y2 = formTextarea(y1, 'Fundamento diagnóstico', report.diagnosisInfo?.diagnosticBasis)

				const y = formTextarea(y2, 'Recomendación de manejo clínico', report.diagnosisInfo?.managementSuggestion)
				if (report?.observations?.lowQualityExam || report?.observations?.requiredComplementaryExams || report?.observations?.requiredFaceToFaceEvaluation) {
					const treatmentNoDiagnosed = (report?.observations?.lowQualityExam ? report?.observations?.lowQualityExam?.explanation + "\n" : "")
						+ (report?.observations?.requiredComplementaryExams ? report?.observations?.requiredComplementaryExams?.explanation + "\n" : "")
						+ (report?.observations?.requiredFaceToFaceEvaluation ? report?.observations?.requiredFaceToFaceEvaluation?.explanation : "")

					return formTextareaObservation(y, report?.observations?.lowQualityExam?.explanation, report?.observations?.requiredComplementaryExams?.explanation, report?.observations?.requiredFaceToFaceEvaluation?.explanation)
				}
				return y
			} else {
				const textNoDiagnosed = report.undeterminedInfo?.explanation
				// const textNoDiagnosed = report?.observations?.lowQualityExam?.explanation ? ' Baja calidad del examen' :
				// 	report?.observations?.requiredComplementaryExams?.explanation ? 'Requiere examenes complementarios' :
				// 		report?.observations?.requiredFaceToFaceEvaluation?.explanation ? 'Requiere evaluación presencial' : '-'
				const y = formTextarea(290, 'Razón de Limitación Diagnóstica', textNoDiagnosed)
				if (report?.observations?.lowQualityExam || report?.observations?.requiredComplementaryExams || report?.observations?.requiredFaceToFaceEvaluation) {
					const treatmentNoDiagnosed = (report?.observations?.lowQualityExam ? "Baja calidad del examen: " + report?.observations?.lowQualityExam?.explanation + "\n" : "")
						+ (report?.observations?.requiredComplementaryExams ? "Requiere exámenes complementarios: " + report?.observations?.requiredComplementaryExams?.explanation + "\n" : "")
						+ (report?.observations?.requiredFaceToFaceEvaluation ? "Requiere evaluación presencial: " + report?.observations?.requiredFaceToFaceEvaluation?.explanation : "")

					return formTextareaObservation(y, report?.observations?.lowQualityExam?.explanation, report?.observations?.requiredComplementaryExams?.explanation, report?.observations?.requiredFaceToFaceEvaluation?.explanation)
				}
				return y
			}
		}



		const formTextarea = (y: number, title: string, value?: string) => {
			const heightOfTitle = doc.fontSize(12).heightOfString(title)
			doc.fontSize(12).fillColor('#2D4D5C').text(title, margins.left, y)

			let heigthOfText = 10

			if (value) {
				heigthOfText = doc.fontSize(9).heightOfString(value)

				doc
					.fontSize(9)
					.fillColor('#000000')
					.text(value, margins.left + 5, y + 20)
			}

			doc
				.roundedRect(margins.left, y + 15, documentW - (margins.left + margins.right), heigthOfText + 5, 3)
				.lineWidth(0.5)
				.strokeColor('#9E9E9E')
				.stroke()

			return y + heigthOfText + heightOfTitle + 23
		}
		const formTextareaObservation = (y: number, lowQualityExam?: string, requiredComplementaryExams?: string, requiredFaceToFaceEvaluation?: string) => {
			const title = "Observaciones";
			const heightOfTitle = doc.fontSize(12).heightOfString(title);
			doc.fontSize(12).fillColor('#2D4D5C').text(title, margins.left, y);

			let heigthOfText = 10;

			if (lowQualityExam) {
				boldText('Baja calidad del examen: '); // Establece el texto en negrita
				doc.text(lowQualityExam, { continued: true }); // Continúa escribiendo sin cambiar el estilo de fuente
				doc.font('Helvetica'); // Restaura el estilo de fuente normal
			}

			doc
				.roundedRect(margins.left, y + 15, documentW - (margins.left + margins.right), heigthOfText + 5, 3)
				.lineWidth(0.5)
				.strokeColor('#9E9E9E')
				.stroke()

			return y + heigthOfText + heightOfTitle + 23
		}
		// const ottoLogo = await getImage('https://smb-email-resources.s3.sa-east-1.amazonaws.com/otto.png')
		// if (ottoLogo) {
		// 	doc.image(ottoLogo, {
		// 		fit: [40, 40],
		// 		align: 'center',
		// 		valign: 'center'
		// 	})
		// }

		const text = `
1 Norte 461, of.703 Viña del mar
(932) 234 56 78
www.simbiotica.ai
contacto@simbiotica.ai`

		doc.fontSize(10).text(text, 0, 35, {
			align: 'right'
		})

		doc
			.moveTo(margins.left, 105)
			.lineWidth(0.5)
			.lineTo(documentW - margins.right, 105)
			.strokeColor('#4C6674')
			.stroke()

		doc.fontSize(12).fillColor('#2D4D5C').text('RESULTADOS DE INTERCONSULTA OTORRINOLARINGOLÓGICA', 108, 120)

		doc
			.moveTo(margins.left, 143)
			.lineWidth(0.5)
			.lineTo(documentW - margins.right, 143)
			.strokeColor('#4C6674')
			.stroke()

		// FORM LEFT
		formInput(
			margins.left,
			160,
			(documentW - (margins.left + margins.right)) / 2 - 10,
			25,
			3,
			'Fecha de examen',
			new Date(report.timestamps.diagnosedAt).toLocaleDateString('es-ES')
		)

		formInput(
			margins.left,
			160 + 25 + 10,
			(documentW - (margins.left + margins.right)) / 2 - 10,
			25,
			3,
			'Médico tratante',
			"report.examinerName"
		)

		formInput(
			margins.left,
			160 + (25 + 10) * 2,
			(documentW - (margins.left + margins.right)) / 2 - 10,
			25,
			3,
			'Método diagnostico',
			"report.diagnosticMethod"
		)

		// FORM RIGHT
		formInput(
			margins.left + (documentW - (margins.left + margins.right)) / 2 + 10,
			160,
			(documentW - (margins.left + margins.right)) / 2 - 10,
			25,
			3,
			'Establecimiento de salud',
			"report.establishmentName"
		)

		formInput(
			margins.left + (documentW - (margins.left + margins.right)) / 2 + 10,
			160 + 25 + 10,
			(documentW - (margins.left + margins.right)) / 2 - 10,
			25,
			3,
			'Medico especialista',
			report.reviewer.firstName
		)

		formInput(
			margins.left + (documentW - (margins.left + margins.right)) / 2 + 10,
			160 + (25 + 10) * 2,
			(documentW - (margins.left + margins.right)) / 2 - 10,
			25,
			3,
			'Motivo de consulta',
			"report.reason"
		)

		doc
			.moveTo(margins.left, 275)
			.lineWidth(0.5)
			.lineTo(documentW - margins.right, 275)
			.strokeColor('#4C6674')
			.stroke()

		const y = diagnosed(!!report.diagnosisInfo?.diagnosis)


		doc.fontSize(12).fillColor('#2D4D5C').text('Consulta presencial con otorrino', margins.left, y)

		// formCheckbox(margins.left + 20, y3 + 10, false)

		doc
			.fontSize(12)
			.fillColor('#2D4D5C')
			.text('Sí', margins.left, y + 30)
		formCheckbox(margins.left + 18, y + 29, !!report.observations?.requiredFaceToFaceEvaluation?.explanation)
		doc
			.fontSize(12)
			.fillColor('#2D4D5C')
			.text('No', margins.left + 100, y + 30)
		formCheckbox(margins.left + 100 + 21, y + 29, !report.observations?.requiredFaceToFaceEvaluation?.explanation)

		const y3 = 550;
		/**
		 * FIRMA
		 * FIRMA
		 * FIRMA
		 * FIRMA
		 * FIRMA
		 */

		// if (!!report?.reviewerSignature) {
		// 	const image = await getImage(report.reviewerSignature)
		// 	doc.image(image, documentW / 2 - 60, y3 + 50, {
		// 		fit: [120, 90]
		// 	})
		// }
		/**
		 * FIRMA
		 * FIRMA
		 * FIRMA
		 * FIRMA
		 * FIRMA
		 */

		doc
			.moveTo(documentW / 2 - 70, y3 + 50 + 90)
			.lineWidth(0.5)
			.lineTo(documentW / 2 + 70, y3 + 50 + 90)
			.strokeColor('#4C6674')
			.stroke()

		doc
			.moveTo(margins.left, y3 + 50 + 110)
			.lineWidth(0.5)
			.lineTo(documentW - margins.right, y3 + 50 + 110)
			.strokeColor('#4C6674')
			.stroke()

		let widthOfString = doc.fontSize(10).widthOfString('EXAMEN PROCESADO POR OTTO | COPIA DE INFORME')
		doc
			.fontSize(10)
			.fillColor('#2D4D5C')
			.text('EXAMEN PROCESADO POR OTTO | COPIA DE INFORME', documentW / 2 - widthOfString / 2, y3 + 50 + 117)

		const terms =
			'Todos los datos privados relacionados con el paciente se encuentran protegidos por la ley 19.628 sobre protección a la vida que resguarda la confidencialidad de estos'
		widthOfString = doc.fontSize(10).widthOfString(terms)
		doc
			.fontSize(8)
			.fillColor('#2D4D5C')
			.text(terms, margins.left, y3 + 50 + 132, { align: 'center' })

		doc
			.fillColor('#0FAFB5')
			.rect(0, documentH - 80, documentW, 80)
			.fill()

		// const simbioticaLogo = await getImage('https://smb-email-resources.s3.sa-east-1.amazonaws.com/simbiotica.png')
		// if (simbioticaLogo) {
		// 	doc.image(simbioticaLogo, documentW - 280 / 2 - margins.right, documentH - 64 / 2 - 25, {
		// 		fit: [280 / 2, 64 / 2]
		// 	})
		// }

		const info = `
E-mail
Número
Sitio web`

		const data = `
contacto@simbiotica.ai
(932) 234 5678
simbiotica.ai`

		doc
			.fontSize(10)
			.fillColor('#ffffff')
			.text(info, margins.left, documentH - 69, {
				align: 'left'
			})

		doc
			.fontSize(10)
			.fillColor('#ffffff')
			.text(data, margins.left + 60, documentH - 69, {
				align: 'left'
			})

		doc.end()

	}
}
