import {container} from "tsyringe";
import { UserUseCase } from "./src/application/User/usecases/user";
import { UserRepository } from "./src/adapter/secondary/user/UserRepository";
import { UserController } from "./src/adapter/primary/user/UserController";
import { UserFindRespository } from "./src/adapter/secondary/user/UserFindRepository";
import { FindUserUseCase } from "./src/application/User/usecases/findUser";
import { FindUserController } from "./src/adapter/primary/user/FindUserController";
import { AuthUserController } from "./src/adapter/primary/user/AuthUserController";
import { AuthenticateUserUseCase } from "./src/application/User/usecases/authenticateUser";
import { PostUseCase } from "./src/application/Post/usecases/post";
import { PostRepository } from "./src/adapter/secondary/post/PostRepository";
import { PostController } from "./src/adapter/primary/post/PostController";
import { FindPostUseCase } from "./src/application/Post/usecases/findPost";
import { FindPostController } from "./src/adapter/primary/post/FindPostController";
import { FindPostRepository } from "./src/adapter/secondary/post/FindPostRepository";
import { CommentUseCase } from "./src/application/Comment/usecases/comment";
import { CommentRepository } from "./src/adapter/secondary/comment/commentRepository";
import { CommentController } from "./src/adapter/primary/comment/CommentController";
import { SubscriptionUsecase } from "./src/application/Subscription/usecases/Subscription";
import { SubscriptionRepository } from "./src/adapter/secondary/subscription/SubscriptionRepository";
import { SubscriptionController } from "./src/adapter/primary/subscription/SubscriptionController";

container.registerSingleton("UserUseCase", UserUseCase)
container.registerSingleton("FindUserUseCase", FindUserUseCase)
container.registerSingleton("AuthenticateUserUseCase",AuthenticateUserUseCase)

container.registerSingleton("PostUseCase", PostUseCase)
container.registerSingleton("FindPostUseCase", FindPostUseCase)
container.registerSingleton("CommentUseCase", CommentUseCase)
container.registerSingleton("SubscriptionUsecase", SubscriptionUsecase)

//Repository
container.registerSingleton("UserRepository", UserRepository)
container.registerSingleton("UserFindRepository", UserFindRespository)
container.registerSingleton("PostRepository", PostRepository)
container.registerSingleton("FindPostRepository", FindPostRepository)
container.registerSingleton("CommentRepository", CommentRepository)
container.registerSingleton("SubscriptionRepository", SubscriptionRepository)

export const userController = container.resolve(UserController)
export const findUserController = container.resolve(FindUserController)
export const authUserController = container.resolve(AuthUserController)
export const postController = container.resolve(PostController)
export const findPostController = container.resolve(FindPostController)
export const commentController = container.resolve(CommentController)
export const subscriptionController = container.resolve(SubscriptionController)