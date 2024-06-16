import { google } from "googleapis";

const GOOGLE_DRIVE_CLIENT_ID = process.env['GOOGLE_DRIVE_CLIENT_ID']
const GOOGLE_DRIVE_CLIENT_SECRET = process.env['GOOGLE_DRIVE_CLIENT_SECRET']
const GOOGLE_DRIVE_REDIRECT_URI = process.env['GOOGLE_DRIVE_REDIRECT_URI']
const GOOGLE_DRIVE_REFRESH_TOKEN = process.env['GOOGLE_DRIVE_REFRESH_TOKEN']


const oauth2client = new google.auth.OAuth2(
    GOOGLE_DRIVE_CLIENT_ID,
    GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN });



export default oauth2client;

