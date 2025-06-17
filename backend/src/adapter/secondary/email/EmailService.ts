import { EmailServicePort } from "@root/src/application/Email/port/secondary/EmailServicePort";
import { transporter } from "@root/src/config/emailTransporter";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { Transporter } from "nodemailer"

export class EmailService implements EmailServicePort{
    private transporter : Transporter = transporter
    //better to move to util
    emailContentGenerator(authorName: string, title: string, preview: string, url: string, authorURL: string){
        return(`
            <!DOCTYPE html>
            <html>
            <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
                <tr>
                    <td align="center">
                    <table width="500" cellpadding="0" cellspacing="0" style="margin:20px 0; border-radius:6px; border:1px solid #e0e0e0;">
                        <!-- Header -->
                        <tr>
                        <td style="padding:20px; background-color:#007bff; color:#ffffff; border-top-radius:6px; border-top-radius:6px;">
                            <h2 style="margin:0;">📢 New Post Alert</h2>
                        </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                        <td style="padding:20px;">
                            <p style="margin:0 0 15px 0; font-size:16px;">Hi there,</p>
                            <p style="margin:0 0 15px 0; font-size:16px;">
                            <strong>${authorName}</strong> has just published a new post
                            </p>
                            <h3 style="margin:0 0 10px 0; color:#333;">${title}</h3>
                            <p style="margin:0 0 20px 0; font-size:14px; color:#555;">${preview}</p>
                            <a href=${url} 
                            style="display:inline-block; background-color:#007bff; color:#ffffff; padding:10px 20px; text-decoration:none; border-radius:4px;">
                            Read the Post
                            </a>
                        </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                        <td style="padding:20px; font-size:12px; color:#888; text-align:center;">
                            You are receiving this because you subscribed to updates from ${authorName}.<br>
                            <a href=${authorURL} style="color:#007bff; text-decoration:none;">Unsubscribe</a>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
            </body>
            </html>
        `)
    }

    async sendPostSubscription(data: any){
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: data.email,
            subject: `Check out ${data.authorName} post`,
            html: this.emailContentGenerator(data.authorName, data.title, data.preview, data.url, data.authorURL),
        }

        const info = await this.transporter.sendMail(mailOptions)
        console.log("email sent", info)
    }

    // sendPasswordReset(){

    // }    
}