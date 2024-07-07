import { verifyGoogleAuthToken } from "../utils/verifyGoogleAuthToken";


async function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const idToken = token.split(' ')[1];

        const userid = await verifyGoogleAuthToken(idToken);

        if (userid) {
            return next();
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default authMiddleware;
