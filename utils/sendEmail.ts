import nodemailer from 'nodemailer';
import nodemailerAuth from './nodemailerAuth.ts';

export default async function sendEmail(toEmail: string, subject: string, text: string, attachmentPath: string) {

    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: nodemailerAuth
    });

    const mailOptions = {
        from: 'ogunsolahabib@gmail.com',
        to: toEmail,
        subject: subject,
        text: text,
        attachments: [
            {
                fileName: subject + '.pdf',
                path: attachmentPath,
                contentType: 'application/pdf'
            },
        ],
    };
    try {

        let info = await transporter.sendMail(mailOptions);

        return info.response;


    } catch (err) {
        console.log('Email error: ', err)
        throw err
    }
}


