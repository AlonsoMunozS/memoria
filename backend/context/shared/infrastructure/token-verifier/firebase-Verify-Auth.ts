import { getAuth, UserCredential, signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import * as admin from "firebase-admin";
import { FirebaseError } from 'firebase/app';
import { Verifier } from "../../domain/verifier";

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export class FirebaseUserAuth implements Verifier {
  async verifyToken(token: string): Promise<string> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        console.log(errorCode)
        throw new Error(errorCode);
      }
      console.log(error) // Puedes lanzar el error nuevamente para manejarlo en un nivel superior si es necesario
      throw error
    }
  }
}


