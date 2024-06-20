import { google } from "googleapis";
import oauth2client from "./oauth2client.ts";

const gmail = google.gmail({
    version: 'v1', auth: oauth2client
});

export default gmail;