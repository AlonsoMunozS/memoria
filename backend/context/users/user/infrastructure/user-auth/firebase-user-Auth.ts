import { UserAttributes } from '../../domain/UserAttributes';
import { User } from '../../domain/user';
import { UserAuth } from '../../domain/userAuth';
import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential  } from "firebase/auth";
import { MongoClient, ServerApiVersion } from "mongodb"

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
const auth: Auth = getAuth();

export class FirebaseUserAuth implements UserAuth {

  async create(userAttributes: UserAttributes, password:string): Promise<any> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userAttributes.email, password);
      const userRegisterToken = await userCredential.user.getIdToken()
      const tokenSections = (userRegisterToken || '').split('.')
    
      const payloadJSON = Buffer.from(tokenSections[1], 'base64').toString('utf8')
      const payload = JSON.parse(payloadJSON)
      const id: number= payload['user_id']
      console.log("FirebaseId:",id)

      const user= User.create({
      id,
      userAttributes
      })

      await client.connect();
      const collection = database.collection(collectionName);
      await collection.insertOne(user);

      return userRegisterToken

    } catch (error: any) {
      const errorMessage: string = error.message;
      console.log("Firebase-user:", errorMessage);
      throw errorMessage; // Throw the error to be caught by the caller
    }
  }

}