import { UserAttributes } from '../../domain/UserAttributes';
import { User } from '../../domain/user';
import { UserAuth } from '../../domain/userAuth';
import { getAuth, UserCredential, signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { MongoClient, ServerApiVersion } from "mongodb"
import { firebaseAuth } from './firebase-config'
import { UserToken } from '../../domain/UserToken';
import * as admin from "firebase-admin";
import { FirebaseError } from 'firebase/app';

const uri = "mongodb://Alonso:1234Alonso@ac-ouxjhz4-shard-00-00.q41p8o6.mongodb.net:27017,ac-ouxjhz4-shard-00-01.q41p8o6.mongodb.net:27017,ac-ouxjhz4-shard-00-02.q41p8o6.mongodb.net:27017/?replicaSet=atlas-8gtwdq-shard-0&authSource=admin&tls=true";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("PruebaPMM");
const collectionName = "Users"

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const authFirebase = getAuth(firebaseAuth);

export class FirebaseUserAuth implements UserAuth {

  async create(userAttributes: UserAttributes, password: string): Promise<void> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(authFirebase, userAttributes.email, password);
      const userRegisterToken = await userCredential.user.getIdToken()
      const tokenSections = (userRegisterToken || '').split('.')
      const payloadJSON = Buffer.from(tokenSections[1], 'base64').toString('utf8')
      const payload = JSON.parse(payloadJSON)
      const id: number = payload['user_id']

      const user = User.create({
        id,
        userAttributes
      })

      await client.connect();
      const collection = database.collection(collectionName);
      await collection.insertOne(user);

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

      console.log("Usuario autenticado con éxito:", userCredential.user);

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

}