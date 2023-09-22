import { UserCreator } from "../application/create/userCreator";
import { UserFinder } from "../application/findById/userFinder";
import { UserLoginer } from "../application/singIn/userLoginer";
import { CreateUserController } from "./rest-api/createUserController";
import { FindByIdUserController } from "./rest-api/findByIdUserController";
import { LoginUserController } from "./rest-api/loginUserController";
import { FirebaseUserAuth } from "./user-auth/firebase-user-Auth";
import { MongoUserRepository } from "./user-repository/mongo-user-repository";

const userFirebaseAuth = new FirebaseUserAuth();
const userRepository = new MongoUserRepository();

const userCreator = new UserCreator(userFirebaseAuth)
const userLoginer = new UserLoginer(userFirebaseAuth)
const userFinder = new UserFinder(userRepository)


export const createUserController = new CreateUserController(userCreator);
export const loginUserController = new LoginUserController(userLoginer);
export const findByIdUserController = new FindByIdUserController(userFinder);