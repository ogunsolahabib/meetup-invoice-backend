
import { config } from 'dotenv';
import { Client } from "pg";

config();


const database = process.env["DB_NAME"];
const host = process.env["DB_HOST"];
const user = process.env["DB_USER"];
const password = process.env["DB_PASSWORD"];
const port = process.env["PORT"];

const dbUrl = `postgresql://${user}:${password}@${host}:${port}/${database}${host === "localhost" ? "" : '?sslmode=verify-full'}`

const client = new Client(dbUrl);

(async () => {
    await client.connect();
})();


export default client;
