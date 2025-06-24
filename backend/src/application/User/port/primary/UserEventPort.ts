
export interface UserEventPort {
    userVectorUpdate(userId: string): Promise<void>
}