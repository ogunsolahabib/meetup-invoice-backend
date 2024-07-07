import { GMAIL_REFRESH_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./constants.ts";
import oauth2client from "./oauth2client.ts";

const nodemailerAuth = {
    type: 'OAuth2',
    user: 'ogunsolahabib@gmail.com',
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    refreshToken: GMAIL_REFRESH_TOKEN,
    accessToken: (await oauth2client.getAccessToken()).token,
}

export default nodemailerAuth