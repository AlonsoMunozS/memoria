import * as admin from "firebase-admin";

async function VerifyToken(token: string): Promise<string | undefined> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("decoded: ", decodedToken)
    return decodedToken.uid;
  } catch (error) {
    return undefined
  }
}

export default VerifyToken;


