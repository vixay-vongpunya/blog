import { PostCreateEventData } from "@root/src/application/Email/types/IEmail";

export interface PostEventPort {
    created(data: PostCreateEventData): Promise<void>
}