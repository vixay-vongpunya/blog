import {container} from "tsyringe";
import { UserUseCase } from "./src/application/User/usecases/User";
import { UserRepository } from "./src/adapter/secondary/user/UserRepository";
import { UserController } from "./src/adapter/primary/user/UserController";
import { UserFindRespository } from "./src/adapter/secondary/user/UserFindRepository";
import { FindUserUseCase } from "./src/application/User/usecases/findUser";
import { UserFindController } from "./src/adapter/primary/user/UserFindController";
import { AuthUserController } from "./src/adapter/primary/user/AuthUserController";
import { AuthenticateUserUseCase } from "./src/application/User/usecases/authenticateUser";

container.registerSingleton('UserUseCase', UserUseCase)
container.registerSingleton('FindUserUseCase', FindUserUseCase)
container.registerSingleton('AuthenticateUserUseCase',AuthenticateUserUseCase)

//Repository
container.registerSingleton('UserRepository', UserRepository)
container.registerSingleton('UserFindRepository', UserFindRespository)

export const userController = container.resolve(UserController)
export const userFindController = container.resolve(UserFindController)
export const authUserController = container.resolve(AuthUserController)