import { UserId } from "../../User/domain/IUser";
import { IPost, PostContent, PostCreated, PostId, PostTitle, PostUpdated } from "./IPost";


export class Post implements IPost {
    public id: PostId
    public title: PostTitle
    public content: PostContent
    public userId: UserId
    public created: PostCreated
    public updated: PostUpdated
    
    constructor(id: PostId, title: PostTitle, content: PostContent, userId: UserId, created: PostCreated, updated: PostUpdated){
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.created = created;
        this.updated = updated
    }
}