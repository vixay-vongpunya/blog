import { PostSendEmailData } from "@root/src/application/Email/types/IEmail";


export interface PostEventPublisherServicePort{
    create(data: PostSendEmailData): void
}