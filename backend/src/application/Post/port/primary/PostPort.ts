import { IPostCreate, IPostToUI } from "../../domain/IPost";

export interface PostPort {
   create(post: IPostCreate): Promise<IPostToUI>; 
}