import { IPostCreate, IPostToUI, IPostUpdate } from "@root/src/application/Post/domain/IPost";
import { PostPort } from "@root/src/application/Post/port/primary/PostPort";
import { inject, injectable } from "tsyringe";
import { PostMapper } from "../../mappers/PostMapper";
import sanitizeHtml from 'sanitize-html';
@injectable()
export class PostController {
    private postMapper: typeof PostMapper
    constructor(@inject("PostUsecase") private post: PostPort){
        this.post = post
        this.postMapper = PostMapper
    }
    private sanitize(content:string): string{
        return sanitizeHtml(content, {
            allowedTags: ['h1', 'h2', 'h3', 'div', 'article', "p", "strong", 
                "em", "ul", "ol", "li", "a", "br", "span", "iframe", "img"],
            allowedAttributes: {
                a: ['*'],
                span: ['*'],
                h1:['*'],
                h2:['*'],
                h3:['*'],
            },
            allowedIframeHostnames: ['www.youtube.com', 'www.google.com'],
        })
    }

    private stripPreview(content:string): string{
        return sanitizeHtml(content, {
            allowedTags: [],
            allowedAttributes: {},
        })
    }

    async create(data: IPostCreate): Promise<IPostToUI>{
        try{
            console.log("check", data)
            data.content = this.sanitize(data.content)
            let preview = this.stripPreview(data.content.slice(0,150))
            // need to check cuz typescript cant infer
            if (typeof data.categoryIds === 'string') {
                data.categoryIds = JSON.parse(data.categoryIds);  
            }
           
            const postDTO = this.postMapper.toDomain({ ...data, preview: preview})
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