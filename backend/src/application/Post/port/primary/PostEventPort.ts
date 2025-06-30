import { PostSendEmailData } from "@root/src/application/Email/types/IEmail";
import { IUserViewedPost } from "@root/src/application/UserViewedPost/domain/IUserViewedPost";
import { IVectorStoreCreateData } from "@root/src/application/VectorStoreService/types/IVectorStore";

export interface PostEventPort {
    viewed(): Promise<void>;
    sendEmail(data: PostSendEmailData): Promise<void>;
    storeVectorData(data: IVectorStoreCreateData): Promise<void>
}