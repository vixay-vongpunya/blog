

export interface UserEventPublisherPort{
    create(eventName: string, payload : any): Promise<void>
}