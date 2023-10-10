import { UserAttributes } from '../../domain/UserAttributes';
import { User } from '../../domain/user';
import { UserAuth } from '../../domain/userAuth';
import { getAuth, UserCredential, signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword, updatePassword, signInWithCustomToken, signOut } from "firebase/auth";
import { firebaseAuth } from './firebase-config'
import { UserToken } from '../../domain/UserToken';
import * as admin from "firebase-admin";
import * as firebase from 'firebase/app';

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
      if (error instanceof firebase.FirebaseError) {
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
      if (error instanceof firebase.FirebaseError) {
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
      if (error instanceof firebase.FirebaseError) {
        const errorCode = error.code;
        console.log(errorCode)
        throw new Error(errorCode);
      }
      console.log(error) // Puedes lanzar el error nuevamente para manejarlo en un nivel superior si es necesario
      throw error
    }
  }
  async refreshToken(refreshToken: string): Promise<UserToken> {
    try {
      const userRecord = await admin.auth().verifyIdToken(refreshToken);
      const newIdToken = await admin.auth().createCustomToken(userRecord.uid);
      console.log(newIdToken)
      console.log("1")
      await signOut(authFirebase); // Cerrar sesión para que signInWithCustomToken funcione correctamente
      console.log("2")
      console.log(refreshToken)
      const newCredentials = await signInWithCustomToken(authFirebase, refreshToken);
      console.log("3")

      const idTokenResult = await newCredentials.user.getIdTokenResult();
      const token = new UserToken({
        accessToken: idTokenResult.token,
        expirationTime: new Date(idTokenResult.expirationTime).getTime(),
        refreshToken: newCredentials.user.refreshToken
      });
      return token;
    } catch (error) {
      if (error instanceof firebase.FirebaseError) {
        const errorCode = error.code;
        console.log(errorCode)
        throw new Error(errorCode);
      } // Puedes lanzar el error nuevamente para manejarlo en un nivel superior si es necesario
      throw error
    }
  }
}


