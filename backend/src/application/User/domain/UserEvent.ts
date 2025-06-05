import { IEvent } from "@root/src/lib/Event";


export interface IUserEvent extends IEvent {
    type: string,
    // not ideal
    payload: {
        id: string, 
        displayName: string,
        emailAddress: string,
    }
}

export class UserCreatedEvent implements IUserEvent{
    type = 'user_created';
    payload: {
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