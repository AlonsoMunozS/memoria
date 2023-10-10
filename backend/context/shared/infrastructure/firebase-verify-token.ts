import * as admin from "firebase-admin";

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

async function VerifyToken(token: string): Promise<string | undefined> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("decoded: ", decodedToken)
    return decodedToken.uid;
  } catch (error) {
    return undefined
  }
}

async function refreshToken1(id: string): Promise<string | undefined> {
  try {
    const customToken = await admin.auth().createCustomToken(id);
    console.log("customToken", customToken)
    return customToken
  } catch (error) {
    return undefined
  }
}
export { VerifyToken, refreshToken1 }


