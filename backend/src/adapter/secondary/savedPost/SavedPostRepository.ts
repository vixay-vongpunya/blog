import { SavedPostRepositoryPort } from "@root/src/application/SavedPost/port/secondary/SavedPostRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import db from "@root/src/infrastructure/db/db";

export class SavedPostRepository implements SavedPostRepositoryPort{
    private model: typeof db.savedPost
    constructor(){
        this.model = db.savedPost
    }

    async create(userId: string, postId: string){
        try{
            const savedPost = await this.model.create({
                data: {
                    userId: userId,
                    postId: postId
                }
            })

            return savedPost
        }
        catch(error){
            throw new UnCaughtError(error)
        }
    }

    async delete(userId: string, id: string){
        try{
            const savedPost = await this.model.findFirst({
                where: {
                    id: id
                }
            })
            console.log(savedPost)
            if(savedPost.userId !== userId) {
                throw new UnCaughtError('you are not allowed', 401)
            }

            const deletedPost = await this.model.delete({
                where:{
                    id: id
                }
            })

            return deletedPost
        }
        catch(error){
            throw new UnCaughtError(error)
        }
    }
}