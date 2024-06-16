import { GoogleAuth } from 'google-auth-library';

const authGoogle = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/drive.file'],
    credentials: {
        client_secret: process.env['GOOGLE_CLIENT_SECRET'],
        client_id: process.env['GOOGLE_CLIENT_ID'],
        client_email: process.env['GOOGLE_CLIENT_EMAIL'],
    },
});


export default authGoogle;