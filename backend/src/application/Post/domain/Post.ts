import { UserId } from "../../User/domain/IUser";
import { IPost, PostContent, PostCreated, PostId, PostImage, PostPreview, PostTitle, PostUpdated } from "./IPost";


export class Post implements IPost {
    public id: PostId
    public title: PostTitle
    public preview: PostPreview
    public content: PostContent
    public authorId: UserId
    public image: PostImage
    public created: PostCreated
    public updated: PostUpdated
    
    constructor( title: PostTitle, preview: PostPreview, content: PostContent, authorId: UserId, image?: PostImage, created?: PostCreated, updated?: PostUpdated, id?: PostId){

        this.title = title;
        this.preview = preview
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