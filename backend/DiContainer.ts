import {container} from "tsyringe";
import { UserUsecase } from "./src/application/User/usecases/user";
import { UserRepository } from "./src/adapter/secondary/user/UserRepository";
import { UserController } from "./src/adapter/primary/user/UserController";
import { FindUserUsecase } from "./src/application/User/usecases/findUser";
import { FindUserController } from "./src/adapter/primary/user/FindUserController";
import { AuthUserController } from "./src/adapter/primary/user/AuthUserController";
import { AuthenticateUserUsecase } from "./src/application/User/usecases/authenticateUser";
import { PostUsecase } from "./src/application/Post/usecases/post";
import { PostRepository } from "./src/adapter/secondary/post/PostRepository";
import { PostController } from "./src/adapter/primary/post/PostController";
import { FindPostUsecase } from "./src/application/Post/usecases/findPost";
import { FindPostController } from "./src/adapter/primary/post/FindPostController";
import { FindPostRepository } from "./src/adapter/secondary/post/FindPostRepository";
import { CommentUsecase } from "./src/application/Comment/usecases/comment";
import { CommentRepository } from "./src/adapter/secondary/comment/commentRepository";
import { CommentController } from "./src/adapter/primary/comment/CommentController";
import { SubscriptionUsecase } from "./src/application/Subscription/usecases/Subscription";
import { SubscriptionRepository } from "./src/adapter/secondary/subscription/SubscriptionRepository";
import { SubscriptionController } from "./src/adapter/primary/subscription/SubscriptionController";
import { FindSubscriptionRepository } from "./src/adapter/secondary/subscription/FindSubscriptionRepository";
import { FindSubscriptionUsecase } from "./src/application/Subscription/usecases/FindSubscription";
import { FindSubscriptionController } from "./src/adapter/primary/subscription/FindSubscriptionController";
import { SavedPostUsecase } from "./src/application/SavedPost/usecases/SavedPost";
import { SavedPostRepository } from "./src/adapter/secondary/savedPost/SavedPostRepository";
import { SavedPostController } from "./src/adapter/primary/savedPost/SavedPostController";
import { FindUserRepository } from "./src/adapter/secondary/user/FindUserRepository";
import { UserEventHandler } from "./src/adapter/secondary/user/UserEventHandler";

container.registerSingleton("UserUsecase", UserUsecase)
container.registerSingleton("FindUserUsecase", FindUserUsecase)
container.registerSingleton("AuthenticateUserUsecase",AuthenticateUserUsecase)
container.registerSingleton("UserEventHandler", UserEventHandler)
container.registerSingleton("PostUsecase", PostUsecase)
container.registerSingleton("FindPostUsecase", FindPostUsecase)
container.registerSingleton("CommentUsecase", CommentUsecase)
container.registerSingleton("SubscriptionUsecase", SubscriptionUsecase)
container.registerSingleton("FindSubscriptionUsecase", FindSubscriptionUsecase)
container.registerSingleton('SavedPostUsecase', SavedPostUsecase)

//Repository
container.registerSingleton("UserRepository", UserRepository)
container.registerSingleton("FindUserRepository", FindUserRepository)
container.registerSingleton("PostRepository", PostRepository)
container.registerSingleton("FindPostRepository", FindPostRepository)
container.registerSingleton("CommentRepository", CommentRepository)
container.registerSingleton("SubscriptionRepository", SubscriptionRepository)
container.registerSingleton("FindSubscriptionRepository", FindSubscriptionRepository)
container.registerSingleton('SavedPostRepository', SavedPostRepository)

export const userController = container.resolve(UserController)
export const findUserController = container.resolve(FindUserController)
export const authUserController = container.resolve(AuthUserController)
export const postController = container.resolve(PostController)
export const findPostController = container.resolve(FindPostController)
export const commentController = container.resolve(CommentController)
export const subscriptionController = container.resolve(SubscriptionController)
export const findSubscriptionController = container.resolve(FindSubscriptionController)
export const savedPostController = container.resolve(SavedPostController)