import { IPostCreate, IPostToUI, IPostUpdate } from "@root/src/application/Post/domain/IPost";
import { PostPort } from "@root/src/application/Post/port/primary/PostPort";
import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { PostMapper } from "../../mappers/PostMapper";
import sanitizeHtml from 'sanitize-html';
@injectable()
export class PostController {
    private postMapper: typeof PostMapper
    constructor(@inject("PostUseCase") private post: PostPort){
        this.post = post
        this.postMapper = PostMapper
    }
    private sanitize(content:string): string{
        return sanitizeHtml(content, {
            allowedTags: ['h1', 'h2', 'h3', 'div', 'article', "p", "strong", 
                "em", "ul", "ol", "li", "a", "br"],
            allowedAttributes: {
                a: ['href', 'target']
            },
            allowedIframeHostnames: ['www.youtube.com', 'www.google.com'],
        })
    }
    async create(body: IPostCreate): Promise<IPostToUI>{
        try{
            body.content = this.sanitize(body.content)

            console.log(body.categoryIds)
            // need to check cuz typescript cant infer
            if (typeof body.categoryIds === 'string') {
                body.categoryIds = JSON.parse(body.categoryIds);  
            }
           
            const postDTO = this.postMapper.toDomain(body)
            const postData = await this.post.create(postDTO)
            return postData

        }
        catch(error){
            throw error
        }
    }

    async update(body: IPostUpdate): Promise<IPostToUI>{
        try{
            const postData = await this.post.update(body)
            return postData

        }
        catch(error){
            throw error
        }
    }
}