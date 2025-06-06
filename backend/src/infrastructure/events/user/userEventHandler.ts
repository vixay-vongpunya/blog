import EventEmitter from "events"
import { IUserEvent } from "@root/src/application/User/domain/UserEvent";
import { UserEventHandlerPort } from "@root/src/application/User/port/secondary/UserEventHandlerPort";
import { BaseEventHandler } from "@root/src/adapter/secondary/events/BaseEventHandler";

export class UserEventHandler implements UserEventHandlerPort{
    private eventEmitter : EventEmitter;
    constructor(){
        this.eventEmitter = BaseEventHandler;
    }

    handle(event: IUserEvent): void{
        this.eventEmitter.emit(event.type, event.payload);
    }
}