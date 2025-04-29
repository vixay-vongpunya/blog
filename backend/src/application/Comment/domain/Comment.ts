import { CommentContent, CommentCreatedAt, CommentId, IComment } from "./IComment"


export class Comment implements IComment {
    public id: CommentId
    public content: CommentContent
    public createdAt: CommentCreatedAt
    constructor(content: CommentContent, createdAt: CommentCreatedAt, id?: CommentId){
        this.content = content
        this.createdAt = createdAt
        
        if(id){
            this.id = id
        }
    }
}