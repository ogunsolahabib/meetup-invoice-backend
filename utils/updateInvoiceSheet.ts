import sheets from "./sheets.ts";


type sheetDataOptions = {
    dateCreated: string,
    contactName: string,
    sponsor_name: string,
    addressLine1: string,
    addressLine2: string,
    dueDate: string,
    invoiceId: string,
    invoiceNumber: number
}
export default async function updateInvoiceSheet(spreadsheetId: string, options: sheetDataOptions) {

    const { dateCreated, contactName, sponsor_name, addressLine1, addressLine2, dueDate, invoiceId, invoiceNumber } = options
    let values = [
        // first column
        [
            // Cell values ...
            `Submitted on ${dateCreated}`,
            null,
            null,
            contactName,
            sponsor_name,
            addressLine1,
            addressLine2,
            null,
            invoiceId
        ],
        [], [], [],
        [null, null, null, invoiceNumber, null, null, dueDate, null, null, null, null, null, 200]

    ];
    const resource = {
        values,
        majorDimension: 'COLUMNS',
    };
    try {

        sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'B9:G21',
            resource,
            valueInputOption: 'USER_ENTERED',

        })
    } catch (err) {
        console.log('sheets update', err)
    }
}