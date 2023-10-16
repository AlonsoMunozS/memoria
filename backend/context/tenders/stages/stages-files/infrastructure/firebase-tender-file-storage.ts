import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as admin from "firebase-admin";
import { TenderFilesStorage } from "../domain/TenderFilesStorage";
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const storage = getStorage();

export class FirebaseStageTenderStorage implements TenderFilesStorage {

    async upload(tenderId: number, fileName: string, file: Buffer): Promise<void> {
        try {
            const storageRef = ref(storage, tenderId.toString() + "/" + fileName);
            await uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        } catch (error: any) {
            console.log(error)
            const errorMessage: string = error.message;
            throw errorMessage; // Throw the error to be caught by the caller
        }

    }
}