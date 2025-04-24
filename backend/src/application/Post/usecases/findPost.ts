import db from "@root/src/infrastructure/db/db";
import { PrismaClient } from ".prisma/client";
import { FindPostPort } from "../port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindPostRepositoryPort } from "../port/secondary/FindPostRepositoryPort";

@injectable()
export class FindPostUseCase implements FindPostPort{
    constructor(@inject("FindPostRepository") private findPostRepository: FindPostRepositoryPort){
        this.findPostRepository = findPostRepository
    }

    async findPostsByUserId(userId: string): Promise<any | null> {
        try{
            let postsData = await this.findPostRepository.findPostsByUserId(userId)
            return postsData
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findPost(postId: string){
        try{
            let post = await this.findPostRepository.findPost(postId)
            return post
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}