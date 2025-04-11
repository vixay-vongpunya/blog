import { UserId } from "../../User/domain/IUser";
import { IPost, PostContent, PostCreated, PostId, PostTitle, PostUpdated } from "./IPost";


export class Post implements IPost {
    public id: PostId
    public title: PostTitle
    public content: PostContent
    public authorId: UserId
    public created: PostCreated
    public updated: PostUpdated
    
    constructor(id: PostId, title: PostTitle, content: PostContent, authorId: UserId, created: PostCreated, updated: PostUpdated){
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.created = created;
        this.updated = updated
    }
}