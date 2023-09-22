import { UserCreator } from "../application/create/userCreator";
import { UserLoginer } from "../application/singin/userLoginer";
import { CreateUserController } from "./rest-api/createUserController";
import { LoginUserController } from "./rest-api/loginUserController";
import { FirebaseUserAuth } from "./user-auth/firebase-user-Auth";

const userFirebaseAuth = new FirebaseUserAuth();

const userCreator = new UserCreator(userFirebaseAuth)
const userLogin = new UserLoginer(userFirebaseAuth)


export const createUserController = new CreateUserController(userCreator);
export const loginUserController = new LoginUserController(userLogin);
