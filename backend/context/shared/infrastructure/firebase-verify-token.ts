import * as admin from "firebase-admin";

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

async function VerifyToken(token: string): Promise<string | undefined> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.log("No se pudo verificar el token", error)
    return undefined
  }
}

export default VerifyToken;


