import { PostCreateEventData } from "@root/src/application/Email/types/IEmail";


export interface PostEventPublisherPort{
    created(data: PostCreateEventData): Promise<void>
}