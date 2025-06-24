import { PostId } from "../../Post/domain/IPost";
import { UserId } from "../../User/domain/IUser";


export interface IUserViewedPost{
    userId: UserId;
    postId: PostId;
}