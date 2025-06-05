import EventEmitter from "events"
import nodemailer from "nodemailer";
import { IUserEvent } from "@root/src/application/User/domain/UserEvent";
import { UserEventHandlerPort } from "@root/src/application/User/port/secondary/UserEventHandlerPort";
import { BaseEventHandler } from "../events/BaseEventHandler";

export class UserEventHandler implements UserEventHandlerPort{
    private eventEmitter : EventEmitter;
    constructor(){
        this.eventEmitter = BaseEventHandler;
    }

    handle(event: IUserEvent): void{
        // this.eventEmitter.emit(event.type, event.payload);
        const transporter = nodemailer.createTransport({
            host: "gmaill",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASS
            },
        });

        transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: "example@gmail.com",
            subject: "Greeting to our new blogger",
            text: "Hello welcome to our blog" + event.payload.displayName

        }, function(error, info){
            if(error){
                console.log(error)
            }
            else{
                console.log("message sent", info)
            }
        })            
    }
}