import { UserCreator } from "../application/create/userCreator";
import { CreateUserController } from "./rest-api/createUserController";
import { FirebaseUserAuth } from "./user-auth/firebase-user-Auth";

const userRepository = new FirebaseUserAuth();

const userCreator = new UserCreator(userRepository)

export const createUserController = new CreateUserController(userCreator);
