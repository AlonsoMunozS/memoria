import { UserAuth } from '../domain/userAuth';
import { getAuth, UserCredential, signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import { UserToken } from '../domain/UserToken';
import { FirebaseError, initializeApp } from 'firebase/app';
import config from '../../../shared/infrastructure/config.local'

const firebaseConfig = config.firebaseConfig

const firebaseAuth = initializeApp(firebaseConfig);
const authFirebase = getAuth(firebaseAuth);

export class FirebaseUserAuth implements UserAuth {

  async create(email: string, password: string): Promise<string> {
    try {
      console.log(email, password)
      const userCredential: UserCredential = await createUserWithEmailAndPassword(authFirebase, email, password);
      const userRegisterToken = await userCredential.user.getIdToken()
      const tokenSections = (userRegisterToken || '').split('.')
      const payloadJSON = Buffer.from(tokenSections[1], 'base64').toString('utf8')
      const payload = JSON.parse(payloadJSON)
      const userId = payload['user_id']
      return userId
    } catch (error: any) {
      const errorMessage: string = error.message;
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
        throw new Error(errorCode);
      }
      throw error
    }
  }

}


