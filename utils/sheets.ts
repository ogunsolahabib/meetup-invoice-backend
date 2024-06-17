import { google } from "googleapis";
import oauth2client from "./oauth2client.ts";

const sheets = google.sheets({
    version: 'v4',
    auth: oauth2client
});



export default sheets;
