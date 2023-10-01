import { UserAttributes } from '../../domain/UserAttributes';
import { User } from '../../domain/user';
import { UserAuth } from '../../domain/userAuth';
import { getAuth, UserCredential, signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import { firebaseAuth } from './firebase-config'
import { UserToken } from '../../domain/UserToken';
import * as admin from "firebase-admin";
import { FirebaseError } from 'firebase/app';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const authFirebase = getAuth(firebaseAuth);

export class FirebaseUserAuth implements UserAuth {

  async create(email: string, password: string): Promise<string> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(authFirebase, email, password);
      const userRegisterToken = await userCredential.user.getIdToken()
      const tokenSections = (userRegisterToken || '').split('.')
      const payloadJSON = Buffer.from(tokenSections[1], 'base64').toString('utf8')
      const payload = JSON.parse(payloadJSON)
      const userId = payload['user_id']
      return userId
    } catch (error: any) {
      const errorMessage: string = error.message;
      console.log(error)
      throw errorMessage; // Throw the error to be caught by the caller
    }
  }
  async login(email: string, password: string): Promise<UserToken> {
    try {
      const userCredential = await signInWithEmailAndPassword(authFirebase, email, password);

      // Aquí obtén el token de acceso del usuario autenticado
      const idTokenResult = await userCredential.user.getIdTokenResult();

      const token = new UserToken({
        accessToken: idTokenResult.token,
        expirationTime: new Date(idTokenResult.expirationTime).getTime(),
        refreshToken: userCredential.user.refreshToken
      });

      return token;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        console.log(errorCode)
        throw new Error(errorCode);
      } // Puedes lanzar el error nuevamente para manejarlo en un nivel superior si es necesario
      throw error
    }
  }
  async updatePassword(email: string, password: string, newPassword: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(authFirebase, email, password)
      await updatePassword(userCredential.user, newPassword)

      // const pass = await updatePassword(userCredential.user, newPassword)
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


