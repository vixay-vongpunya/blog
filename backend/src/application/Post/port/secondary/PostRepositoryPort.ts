import { IPostCreate, IPostToUI, IPostUpdate, IPostUpdateView } from "../../domain/IPost";


export interface PostRepositoryPort{
    create(post: IPostCreate): Promise<IPostToUI>;
    update(post: IPostUpdate): Promise<any>;
    updateViews(post: IPostUpdateView): Promise<void>;
}