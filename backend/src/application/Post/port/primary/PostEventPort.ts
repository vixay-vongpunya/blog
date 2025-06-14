import { PostSendEmailData } from "@root/src/application/Email/types/IEmail";
import { IVectorStoreCreateData } from "@root/src/application/VectorStoreService/types/IVectorStore";

export interface PostEventPort {
    sendEmail(data: PostSendEmailData): Promise<void>,
    storeVectorData(data: IVectorStoreCreateData): Promise<void>
}