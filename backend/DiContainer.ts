import {container} from "tsyringe";
import { CreateUserUseCase } from "./src/application/User/usecases/createUser";
import { UserRepository } from "./src/adapter/secondary/user/UserRepository";
import { UserCreateController } from "./src/adapter/primary/user/UserCreateController";
import { UserFindRespository } from "./src/adapter/secondary/user/UserFindRepository";
import { FindUserUseCase } from "./src/application/User/usecases/findUser";
import { UserFindController } from "./src/adapter/primary/user/UserFindController";
import { AuthUserController } from "./src/adapter/primary/user/AuthUserController";
import { AuthenticateUserUseCase } from "./src/application/User/usecases/authenticateUser";

container.registerSingleton('CreateUserUseCase', CreateUserUseCase)
container.registerSingleton('FindUserUseCase', FindUserUseCase)
container.registerSingleton('AuthenticateUserUseCase',AuthenticateUserUseCase)

//Repository
container.registerSingleton('UserRepository', UserRepository)
container.registerSingleton('UserFindRepository', UserFindRespository)

export const userCreateController = container.resolve(UserCreateController)
export const userFindController = container.resolve(UserFindController)
export const authUserController = container.resolve(AuthUserController)