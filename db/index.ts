
import { config } from 'dotenv';
import { Client } from "pg";

config();


// localhost

const database = process.env["DB_NAME"];
const host = process.env["DB_HOST"];
const user = process.env["DB_USER"];
const password = process.env["DB_PASSWORD"];
const port = process.env["PORT"];

const dbUrl = `postgresql://${user}:${password}@${host}:${port}/${database}${host === "localhost" ? "" : '?sslmode=verify-full'}`

const client = new Client(dbUrl);

(async () => {
    if (host === "localhost") {
        await client.connect();
    }
})();




// production
const dbConfig = {
    user,
    password,
    host,
    port,
    database,
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUFzjZTSB6sIP4vIoeAnCiTGAKUg4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMjRlZDc3YzUtMWQzYS00ZDEwLWJlNGUtNzczOGM2NGNm
YWFmIFByb2plY3QgQ0EwHhcNMjQwNzA4MDIwNTUwWhcNMzQwNzA2MDIwNTUwWjA6
MTgwNgYDVQQDDC8yNGVkNzdjNS0xZDNhLTRkMTAtYmU0ZS03NzM4YzY0Y2ZhYWYg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJah9k0M
427tHY/n4e5iRCrujl2OeEHD3btrxDr1V2WeY5P04DwwOx1nvdjCFSrsrUL7fg3k
EE8O+YXARlNfCayNtUppt4j3wyky1UD4d54RKoSFStv2OiYy3kc7s3d24I77+0Rn
sfytfoV46ZTQHZr3VwmqfirEwn3zcf07z+ZwcazNw7mcVSR76AunAz5NTZCRIDXE
869ZApsLSq/3Hq/B71obrbBziTrrvDlflvcFSCRUHk9U+6hF0LPQfU/A2YVX0T6t
CqNoFM7kTgyw8pHAngXSuxYAyr4rAAzTfYWbHesSztAl1EKVChMnUwfBgcgyeFOb
ymLV650JxRUWSnS7Dfgwwbv4rG80SYtqVWS+Itv0J3Ma34Mg6MXkj4HAZDayEpu+
uK/fGsfHQftGY9K+MVka+8SfyxsPuJhd77Hw/PCcqhgxLJtv18QTinOCsEs/3Kw2
JRSS7ERI4fKWZDOKh1/N6wJA6U8yZwNqtlVXcdK09ep1bpWJWdmpF1CVAwIDAQAB
oz8wPTAdBgNVHQ4EFgQUwnui1S4BJADgKLrEJTptTIhQ9rYwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBACsdQAFeUbviCXtV
LfaxM3x1Oris8aiucKBbtV0I8A2XHvF2lXu6jyG8/NwWyv71TPgIi6w1XAl29Eou
uepvDjQJ9AUnw86OfEa5S/0BNNYOLZkj/a6dcY0PpToCAMcgbjBbTaTeC8y5q96p
B8IX135Ol5HQIpPDvuSnwRPtRjHbUY9PRdtV85tq28+8XDGbVOqy44DfUJR/F74D
saznFDCSV9scirjwXEazRpEdaTv1gyyiaJCgLQGZqb4tiNtH5fYQohmyf8ONNl6o
icKJdkxk2ZIdWk4qiNERGoGDqcwZzPYwAArch2BhNwZDshbbyHd+lkGSil4ChrzM
4xgDQ6lVhRMM+GKnn2TCYhnYBdrASSOo5BHnR/zYQj8O05sunbc9CiFYZCgSsVE/
EPO9oGJiN6n9THGjOKwBb0bsHR8f7cXhDgG38ODsmVsxVe+9nqIIz6rFilub9em5
XMS+L3SnIIjxWg3b9ckwGT8ThQj8XejAHYOOcX2JghPFcVFrxQ==
-----END CERTIFICATE-----`,
    },
};

const dbClient = new Client(dbConfig);
dbClient.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});



export default client;
