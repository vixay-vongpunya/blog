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
import { EmailService } from "./src/adapter/secondary/email/EmailService";
import { PostEventUsecase } from "./src/application/Post/usecases/postEvent";
import { PostConsumer } from "./src/adapter/primary/post/PostConsumer";
import { VectorStoreService } from "./src/adapter/secondary/vectorStoreService/VectorStoreService";
import { PostEventPublisherService } from "./src/adapter/secondary/post/PostEventPublisherService";
import { UserViewedPostRepository } from "./src/adapter/secondary/userViewedPost/UserViewedPostRepository";
import { UserEventPublisherService } from "./src/adapter/secondary/user/UserEventPublisherService";
import { UserEventUsecase } from "./src/application/User/usecases/event";
import { UserConsumer } from "./src/adapter/primary/user/UserConsumer";
import { FindSearchHistoryUsecase } from "./src/application/SearchHistory/usecases/findSearchHistory";
import { FindSearchHistoryRepository } from "./src/adapter/secondary/searchHistory/FindSearchHistoryRepository";
import { SearchHistoryRepository } from "./src/adapter/secondary/searchHistory/SearchHistoryRepository";
import { FindSearchHistoryController } from "./src/adapter/primary/searchHistory/FindSearchHistoryController";
import { SearchHistoryController } from "./src/adapter/primary/searchHistory/SearchHistoryController";
import { SearchHistoryUsecase } from "./src/application/SearchHistory/usecases/searchHistory";
import { FindVectorStoreController } from "./src/adapter/primary/vectorStore/FindVectorStoreController";
import { VectorStoreUsecase } from "./src/application/VectorStoreService/usecases/vectorStore";

//usecase
container.registerSingleton("UserUsecase", UserUsecase)
container.registerSingleton("UserEventUsecase", UserEventUsecase)
container.registerSingleton("FindUserUsecase", FindUserUsecase)
container.registerSingleton("AuthenticateUserUsecase",AuthenticateUserUsecase)
container.registerSingleton("PostUsecase", PostUsecase)
container.registerSingleton("PostEventUsecase", PostEventUsecase)
container.registerSingleton("FindPostUsecase", FindPostUsecase)
container.registerSingleton("CommentUsecase", CommentUsecase)
container.registerSingleton("SubscriptionUsecase", SubscriptionUsecase)
container.registerSingleton("FindSubscriptionUsecase", FindSubscriptionUsecase)
container.registerSingleton('SavedPostUsecase', SavedPostUsecase)
container.registerSingleton("SearchHistoryUsecase", SearchHistoryUsecase)
container.registerSingleton("FindSearchHistoryUsecase", FindSearchHistoryUsecase)
container.registerSingleton("VectorStoreUsecase", VectorStoreUsecase)

//Repository
container.registerSingleton("UserRepository", UserRepository)
container.registerSingleton("FindUserRepository", FindUserRepository)
container.registerSingleton("PostRepository", PostRepository)
container.registerSingleton("FindPostRepository", FindPostRepository)
container.registerSingleton("CommentRepository", CommentRepository)
container.registerSingleton("SubscriptionRepository", SubscriptionRepository)
container.registerSingleton("FindSubscriptionRepository", FindSubscriptionRepository)
container.registerSingleton('SavedPostRepository', SavedPostRepository)
container.registerSingleton("UserViewedPostRepository", UserViewedPostRepository)
container.registerSingleton("FindSearchHistoryRepository", FindSearchHistoryRepository)
container.registerSingleton("SearchHistoryRepository", SearchHistoryRepository)

//events
container.registerSingleton("PostEventPublisherService", PostEventPublisherService)
container.registerSingleton("UserEventPublisherService", UserEventPublisherService)

//service
container.registerSingleton("EmailService", EmailService)
container.registerSingleton("VectorStoreService", VectorStoreService)

//controller
export const userController = container.resolve(UserController)
export const findUserController = container.resolve(FindUserController)
export const authUserController = container.resolve(AuthUserController)
export const postController = container.resolve(PostController)
export const findPostController = container.resolve(FindPostController)
export const commentController = container.resolve(CommentController)
export const subscriptionController = container.resolve(SubscriptionController)
export const findSubscriptionController = container.resolve(FindSubscriptionController)
export const savedPostController = container.resolve(SavedPostController)
export const findSearchHistoryController = container.resolve(FindSearchHistoryController)
export const searchHistoryController = container.resolve(SearchHistoryController)
export const findVectorStoreController = container.resolve(FindVectorStoreController)

//event consummers
export const postConsumer = container.resolve(PostConsumer)
export const userConsumer = container.resolve(UserConsumer)