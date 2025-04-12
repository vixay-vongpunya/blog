import { UserId } from "../../User/domain/IUser";
import { IPost, PostContent, PostCreated, PostId, PostImage, PostTitle, PostUpdated } from "./IPost";


export class Post implements IPost {
    public id: PostId
    public title: PostTitle
    public content: PostContent
    public authorId: UserId
    public image: PostImage
    public created: PostCreated
    public updated: PostUpdated
    
    constructor( title: PostTitle, content: PostContent, authorId: UserId, image?: PostImage, created?: PostCreated, updated?: PostUpdated, id?: PostId){

        this.title = title;
        this.content = content;
        this.authorId = authorId;
        if(image){
            this.image = image
        }
        if (created){
            this.created = created
        }
        if(updated){
            this.updated = updated
        }
        if (id){
            this.id = id
        }
    }
}