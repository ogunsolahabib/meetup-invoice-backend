import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client();

export async function verifyGoogleAuthToken(idToken: string) {
    try {
        // idToken = idToken.replace('x', 's'); // for testing
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env['GOOGLE_CLIENT_ID']
        });
        const payload = ticket.getPayload();
        const userid = payload ? payload['sub'] : null;
        // If request specified a G Suite domain:
        // const domain = payload['hd'];

        return userid;
    } catch (err) {
        return Promise.reject(err);
    }
}