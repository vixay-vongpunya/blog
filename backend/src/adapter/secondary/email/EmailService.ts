import { EmailServicePort } from "@root/src/application/Email/port/secondary/EmailServicePort";
import { transporter } from "@root/src/config/emailTransporter";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { Transporter } from "nodemailer"

export class EmailService implements EmailServicePort{
    private transporter : Transporter = transporter

    constructor(){}

    async sendPostSubscription(data: any){
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: data.email,
            subject: `Check out ${data.author} post`,
            text: `${data.authorName} has just made a new post check it out! 
            ${data.title}
            ${data.preview} 
            ${data.url}`
            //need to send html instead
        }

        try{
            const info = await this.transporter.sendMail(mailOptions)
            console.log("email sent", info)
        }
        catch(error){
            throw new UnCaughtError(error)
        }
    }

    sendPasswordReset(){

    }

    
}