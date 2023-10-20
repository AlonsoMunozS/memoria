import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import * as admin from "firebase-admin";
import { StagesFilesStorage } from "../domain/StagesFilesStorage";
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const storage = getStorage();

export class FirebaseStageFilesStorage implements StagesFilesStorage {

    async upload(tenderId: number, stageName: number, fileName: string, file: Buffer): Promise<void> {
        try {
            const storageRef = ref(storage, tenderId.toString() + "/" + stageName.toString() + "/" + fileName);
            await uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        } catch (error: any) {
            console.log(error)
            const errorMessage: string = error.message;
            throw errorMessage; // Throw the error to be caught by the caller
        }

    }
    async findFileNameByStage(tenderId: number, stageName: number): Promise<Array<{ fileName: string, downloadUrl: string }>> {
        try {
            const itemsFile = [];
            let storageRef = ref(storage, tenderId.toString() + "/" + stageName.toString());
            const filesName = await listAll(storageRef)
            const filesNameMapped = filesName.items.map((item) => {
                return item.name
            })
            for (const archivo of filesNameMapped) {
                const fileRef = ref(storage, tenderId.toString() + "/" + stageName.toString() + "/" + archivo); // Asegúrate de tener la ruta correcta en Firebase Storage aquí

                const downloadUrl = await getDownloadURL(fileRef);
                itemsFile.push({ fileName: archivo, downloadUrl: downloadUrl });
                // Puedes manejar el error según tus necesidades, como omitir este archivo y continuar con otros.
            }
            return itemsFile
        } catch (error: any) {
            console.log(error)
            const errorMessage: string = error.message;
            throw errorMessage; // Throw the error to be caught by the caller
        }
    }
}