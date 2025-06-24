

export interface UserEventPublisherServicePort{
    create(payload : any): void;
    updateUserVector(userId: string): void; 
}