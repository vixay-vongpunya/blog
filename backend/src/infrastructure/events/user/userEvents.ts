import { BaseEventHandler } from "@root/src/adapter/secondary/events/BaseEventHandler";
import { IUserEvent, UserEvents } from "@root/src/application/User/domain/UserEvent";
import nodemailer from "nodemailer";

console.log("started")

BaseEventHandler.on(UserEvents.UserCreated, (event: IUserEvent)=>{
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
})

