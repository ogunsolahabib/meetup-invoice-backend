import path from 'path'
import fs from 'fs'
import { resend } from './resend.ts';

// Example usage
const recipientEmail = 'recipient@example.com';
const emailSubject = 'Your PDF Document';
const emailText = 'Please find the attached PDF document.';
const pdfFilePath = path.join(__dirname, 'sheet.pdf');

// sendEmailWithAttachment(recipientEmail, emailSubject, emailText, pdfFilePath);

export default async function sendEmail(toEmail: string, subject: string, text: string, attachmentPath: string) {



    const attachment = fs.readFileSync(attachmentPath).toString('base64');
    const response = await resend.emails.send({
        to: toEmail,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: path.basename(attachmentPath),
                content: attachment,
                type: 'application/pdf',
                disposition: 'attachment',
            },
        ],
    });

    console.log(response.data);
}


