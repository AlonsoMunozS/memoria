import express from "express";
import multer from 'multer';
import { uploadTenderFileController } from "../tenderFilesDependencies";

const tenderFilesRouters = express.Router();

const storage = multer.memoryStorage(); // Almacena el archivo en memoria (puedes ajustar esto según tus necesidades)
const upload = multer({ storage: storage });

tenderFilesRouters.post(
    "/upload/:tenderId",
    upload.single('file'),
    uploadTenderFileController.uploadTenderFile.bind(uploadTenderFileController)
);

export { tenderFilesRouters };
