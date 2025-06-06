import { IEvent } from "@root/src/lib/Event";

export const UserEvents = {
    UserCreated: 'user_created',
    UserUpdated: 'user_updated'
}as const

export interface IUserEvent extends IEvent {
    type: typeof UserEvents[keyof typeof UserEvents]
    // not ideal
    payload: {
        id: string, 
        displayName: string,
        emailAddress: string,
    }
}

export class UserCreatedEvent implements IUserEvent{
    readonly type = UserEvents.UserCreated;
    readonly payload: {
        id: string, 
        displayName: string,
        emailAddress: string,
    }

    constructor(id: string, displayName: string, emailAddress: string){
        this.payload = {
            id: id,
            displayName: displayName,
            emailAddress: emailAddress
        };
    }
}