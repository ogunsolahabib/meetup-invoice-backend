import nodemailer from 'nodemailer';
import nodemailerAuth from './nodemailerAuth.ts';

export default async function sendEmail(toEmail: string, subject: string, text: string, attachmentPath: string) {

    try {
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
                    fileName: process.env['SHEET_PDF_PATH'],
                    path: attachmentPath,
                    contentType: 'application/pdf'
                },
            ],
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });


    } catch (err) {
        console.log('Email error: ', err)
    }
}


