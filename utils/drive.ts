import { google } from "googleapis";
import oauth2client from "./oauth2client.ts";

const drive = google.drive({
    version: 'v3',
    auth: oauth2client
});



export default drive;
