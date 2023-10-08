import { UserCreator } from "../context/users/user/application/create/userCreator";
import { UserFinder } from "../context/users/user/application/findById/userFinder";
import { UserLoginer } from "../context/users/user/application/singIn/userLoginer";
import { PasswordUpdater } from "../context/users/user/application/updatePassword/passwordUpdater";
import { FirebaseUserAuth } from "../context/users/user/infrastructure/firebase-user-Auth";
import { MongoUserRepository } from "../context/users/user/infrastructure/mongo-user-repository";
import { CreateUserController } from "./users-api/createUserController";
import { FindByIdUserController } from "./users-api/findByIdUserController";
import { LoginUserController } from "./users-api/loginUserController";
import { UpdatePasswordController } from "./users-api/updatePasswordController";

const userFirebaseAuth = new FirebaseUserAuth();
const userRepository = new MongoUserRepository();

const userCreator = new UserCreator(userFirebaseAuth, userRepository)
const userLoginer = new UserLoginer(userFirebaseAuth)
const userFinder = new UserFinder(userRepository)
const passwordUpdater = new PasswordUpdater(userFirebaseAuth)

export const createUserController = new CreateUserController(userCreator);
export const loginUserController = new LoginUserController(userLoginer);
export const findByIdUserController = new FindByIdUserController(userFinder);
export const updatePasswordController = new UpdatePasswordController(passwordUpdater);

