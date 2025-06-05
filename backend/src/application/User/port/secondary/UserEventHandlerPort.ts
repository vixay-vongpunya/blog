import { IUserEvent } from "../../domain/UserEvent";


export interface UserEventHandlerPort{
    handle(events: IUserEvent): void
}