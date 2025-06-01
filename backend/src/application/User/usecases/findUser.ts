import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { IUser, IUserToUI, UserId } from "../domain/IUser";
import { FindUserPort } from "../port/primary/FindUserPort";
import { UserFindRespositoryPort } from "../port/secondary/UserFindRepositoryPort";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@root/src/Errors/NotFound";
import { UserMapper } from "@root/src/adapter/mappers/UserMapper";
import { FindPostRepositoryPort } from "../../Post/port/secondary/FindPostRepositoryPort";
import { FindSubscriptionRepositoryPort } from "../../Subscription/port/secondary/FindSubscriptionRepositoryPort";

@injectable()
export class FindUserUsecase implements FindUserPort {
    private userMapper: typeof UserMapper
    constructor(@inject('FindUserRepository') private findUserRepository: UserFindRespositoryPort,
            @inject('FindPostRepository') private findPostRepository: FindPostRepositoryPort,
            @inject('FindSubscriptionRepository') private findSubscriptionRepository: FindSubscriptionRepositoryPort,
        ){
        this.findUserRepository = findUserRepository
        this.userMapper = UserMapper
    }
    async findByEmail(email: string): Promise<IUserToUI | null> {
        try{
            let user = await this.findUserRepository.findByEmail(email)
            if(!user){
                throw new NotFoundError("user not found")
            }
            return this.userMapper.toUI(user)

        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findById(id: UserId):Promise<IUserToUI | null>{
        try{
            const user = await this.findUserRepository.findById(id)
            if(!user){
                throw new NotFoundError("user not found")
            }
            return this.userMapper.toUI(user)
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByCategory(userId: string, categoryId: UserId, cursor: string):Promise<any>{
        try{
            const authors = await this.findPostRepository.findAuthorsByCategory(categoryId, cursor)
            const categoryAuthors = await Promise.all(
                authors.map(async({author}: any)=>{
                    const [followerCount, subscription] = await Promise.all([
                        this.findSubscriptionRepository.findUserSubscriptionFollowerCount(author.id),
                        this.findSubscriptionRepository.findUserSubscription(userId, author.id)
                    ])
                    return {
                        ...author,
                        followerCount: followerCount,
                        subscription: {
                            id: subscription?.id ? subscription.id : null
                        }
                    }
                })
            )
            return categoryAuthors
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}