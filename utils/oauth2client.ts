import { google } from "googleapis";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_DRIVE_REFRESH_TOKEN } from "./constants.ts";



const oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN });



export default oauth2client;

