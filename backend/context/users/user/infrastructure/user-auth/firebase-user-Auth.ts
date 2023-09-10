import { UserAttributes } from '../../domain/UserAttributes';
import { User } from '../../domain/user';
import { UserAuth } from '../../domain/userAuth';
import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { MongoClient, ServerApiVersion } from "mongodb"
import { firebaseAuth } from './firebase-config'
import { UserToken } from '../../domain/UserToken';
const uri = "mongodb+srv://Alonso:1234Alonso@pruebapmm.q41p8o6.mongodb.net/?retryWrites=true&w=majority";

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

const auth: Auth = getAuth(firebaseAuth);

export class FirebaseUserAuth implements UserAuth {

  async create(userAttributes: UserAttributes, password: string): Promise<void> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userAttributes.email, password);
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
      throw errorMessage; // Throw the error to be caught by the caller
    }
  }
  async login(email: string, password: string): Promise<UserToken> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);

      // Obtén el resultado del token de acceso, que incluye el tiempo de expiración.
      const idTokenResult = await userCredential.user.getIdTokenResult();

      const token = new UserToken({
        accessToken: idTokenResult.token,
        expirationTime: Date.parse(idTokenResult.expirationTime),
        refreshToken: userCredential.user.refreshToken
      });

      return token;
    } catch (error: any) {
      const errorMessage: string = error.message;
      throw errorMessage; // Lanza el error para que lo capture el llamador
    }
  }
}