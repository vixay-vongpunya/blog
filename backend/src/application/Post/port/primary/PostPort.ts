import { IPostCreate, IPostToUI, IPostUpdate } from "../../domain/IPost";

export interface PostPort {
   create(post: IPostCreate): Promise<IPostToUI>; 
   update(post: IPostUpdate): Promise<IPostToUI>
}