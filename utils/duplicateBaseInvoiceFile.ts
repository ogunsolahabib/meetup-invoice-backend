import drive from "./drive.ts";

const BASE_INVOICE_ID = process.env["GOOGLE_DRIVE_BASE_INVOICE_ID"];

export default async function duplicateBaseInvoiceFile() {
    const duplicate = await drive.files.copy({
        fileId: BASE_INVOICE_ID,
        fields: 'id'
    });

    return duplicate.data.id;

}

