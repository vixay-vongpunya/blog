import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { IUser, IUserToUI, UserId, UserName } from "../domain/IUser";
import { FindUserPort } from "../port/primary/FindUserPort";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@root/src/Errors/NotFound";
import { UserMapper } from "@root/src/adapter/mappers/UserMapper";
import { FindPostRepositoryPort } from "../../Post/port/secondary/FindPostRepositoryPort";
import { FindSubscriptionRepositoryPort } from "../../Subscription/port/secondary/FindSubscriptionRepositoryPort";
import { FindUserRepositoryPort } from "../port/secondary/FindUserRepositoryPort";

@injectable()
export class FindUserUsecase implements FindUserPort {
    private userMapper: typeof UserMapper
    constructor(@inject('FindUserRepository') private findUserRepository: FindUserRepositoryPort,
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

    // for not so detailed profile
    async findById(userId: UserId){
        try{
            const [userData, followerCount, followingCount] = await Promise.all([
                this.findUserRepository.findById(userId),
                this.findSubscriptionRepository.findUserSubscriptionFollowerCount(userId),
                this.findSubscriptionRepository.findUserSubscriptionFollowingCount(userId),
            ])
            
            const user = {
                ...userData,
                subscription: {
                    followerCount: followerCount,
                    followingCount: followingCount,
                },
                profileImage: userData.profileImage ? `http://localhost:4000/public/users/profileImages/${userData.profileImage}` : null,
            }
            if(!user){
                throw new NotFoundError("user not found")
            }
            return user
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    //for detailed profile
    async findByName(name: UserName){
        try{
            const userData = await this.findUserRepository.findByName(name)
            console.log("aj", userData)
            const [followerCount, followingCount] = await Promise.all([
                this.findSubscriptionRepository.findUserSubscriptionFollowerCount(userData.id),
                this.findSubscriptionRepository.findUserSubscriptionFollowingCount(userData.id),
            ])
            
            const user = {
                ...userData,
                subscription: {
                    followerCount: followerCount,
                    followingCount: followingCount,
                },
                profileImage: userData.profileImage ? `http://localhost:4000/public/users/profileImages/${userData.profileImage}` : null,
                backgroundImage: userData.backgroundImage ? `http://localhost:4000/public/users/backgroundImages/${userData.backgroundImage}` : null,
            }
            if(!user){
                throw new NotFoundError("user not found")
            }
            return user
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByCategory(userId: string, categoryId: UserId, cursor: string){
        try{
            const authors = await this.findPostRepository.findAuthorsByCategory(categoryId, cursor)
            const categoryAuthors = await Promise.all(
                authors.map(async({author}: any)=>{
                    const [followerCount, subscription] = await Promise.all([
                        this.findSubscriptionRepository.findUserSubscriptionFollowerCount(author.id),
                        this.findSubscriptionRepository.findUserSubscriptionId(userId, author.id)
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