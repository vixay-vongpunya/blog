import { PostSendEmailData } from "@root/src/application/Email/types/IEmail";
import { IUserViewedPost } from "@root/src/application/UserViewedPost/domain/IUserViewedPost";


export interface PostEventPublisherServicePort{
    create(data: PostSendEmailData): void;
    viewed(data: IUserViewedPost): void;
}