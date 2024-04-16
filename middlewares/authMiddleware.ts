import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();


async function verify(idToken: string) {
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



async function authMiddleware(req, res, next) {

    const token = req.headers['authorization'];

    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const idToken = token.split(' ')[1];

        const userid = await verify(idToken);

        if (userid) {
            return next();
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default authMiddleware;
