import express from "express";
import multer from 'multer';
import { findFileNameByStageController, uploadStageFileController } from "../stagesFilesDependencies";

const stageFilesRouters = express.Router();

const storage = multer.memoryStorage(); // Almacena el archivo en memoria (puedes ajustar esto según tus necesidades)
const upload = multer({ storage: storage });

stageFilesRouters.post(
    "/upload/:tenderId/:stageName",
    upload.single('file'),
    uploadStageFileController.uploadStageFile.bind(uploadStageFileController)
);
stageFilesRouters.get(
    "/find/:tenderId/:stageName",
    findFileNameByStageController.findFileNameByStage.bind(findFileNameByStageController)
);

export { stageFilesRouters };
