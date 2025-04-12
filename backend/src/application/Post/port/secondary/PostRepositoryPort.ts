import { IPostCreate, IPostToUI } from "../../domain/IPost";


export interface PostRepositoryPort{
    create(post: IPostCreate): Promise<IPostToUI>;
}