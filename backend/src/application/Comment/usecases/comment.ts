import { inject, injectable } from "tsyringe";
import { CommentRepositoryPort } from "../port/secondary/CommentRepositoryPort";
import { IComment, ICommentCreate, ICommentFindReply, ICommentSearch } from "../domain/IComment";
import { CommentPort } from "../port/primary/CommentPort";

@injectable()
export class CommentUsecase implements CommentPort{
    constructor(@inject("CommentRepository") private commentRepository: CommentRepositoryPort){
        this.commentRepository = commentRepository
    }
    
    async create(comment: ICommentCreate){
        const commentData = await this.commentRepository.create(comment)
        return commentData
    }

    async findReply(data: ICommentFindReply) {
        const replyData = await this.commentRepository.findReply(data)
        const replyIds = replyData.map(item=>item.id)
        const replyCount = await this.commentRepository.findReplyCountByGroup(replyIds)
        // there wont be duplicate parentIds
        const replyCountMap = new Map(replyCount.map((item: any) => [item.parentId, item._count.id]))
        const replies = replyData.map(item=>({
            ...item,    
            replyCount: replyCountMap.get(item.id) ?? 0,
        }))
        
        return replies
    }

    async findByPost(data: ICommentSearch): Promise<IComment[]> {
        const commentsData = await this.commentRepository.findByPost(data)
        // prepare top level ids for group search get all first level reply id
        const topLevelCommentIds = commentsData.map(item=>item.id)

        const firstLevelReplies = await this.commentRepository.findAllReply(topLevelCommentIds) 
        // prepare to get count of all seconda level replies belonged to first level
        const firstLevelReplyIds = firstLevelReplies.map(item=>item.id)

        const secondaLevelReplyCount = await this.commentRepository.findReplyCountByGroup(firstLevelReplyIds)

        //store in a Map to avoid many nested loop at merging with topComments in next step
        const firstLevelReplyCount = new Map(
            secondaLevelReplyCount.map((item: {parentId: string, _count:{id: number}})=>[item.parentId, item._count.id])
        )

        // use reduce here to take advantage of checking the existed id 
        const topLevelCountMap = firstLevelReplies.reduce((map, item) => {
            //fetching for top level-> reply count(total)
            //since at first level the parentId can be duplicated, so i check then add to existing value
            // + 1 to account for the first level reply
            map.set(item.parentId, (map.get(item.parentId) ?? 0 + Number(firstLevelReplyCount.get(item.id) ?? 0)) + 1)
            return map
        }, new Map<string, number>())   

        const comments = commentsData.map(item=>({
            ...item,
            replyCount: topLevelCountMap.get(item.id) ?? 0
            })
        )

        return comments
    }

    async findByPostTotalCount(postId: string){
        const totalCount = await this.commentRepository.findByPostTotalCount(postId)
        return totalCount
    }
}