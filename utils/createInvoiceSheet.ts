import createFolder from "./createFolder.ts";
import drive from "./drive.ts";
import duplicateBaseInvoiceFile from "./duplicateBaseInvoiceFile.ts";
import exportSheetToPDF from "./exportSheetToPdf.ts";
import moveFileToFolder from "./moveFileToFolder.ts";
import sendEmail from "./sendEmail.ts";
import updateInvoiceSheet from "./updateInvoiceSheet.ts";
import path from 'path';

const testMonth = 'Dec';

const testYear = '1995';

const testName = 'DarkLiquid';


export default async function createInvoiceSheet() {

    const fileName = `${testYear}-${testMonth}-${testName}-Invoice`
    try {

        // duplicate base file
        // const duplicate = await duplicateBaseInvoiceFile();

        // rename duplicate file
        // await drive.files.update({
        //     fileId: duplicate,
        //     requestBody: {
        //         name: fileName
        //     }
        // });

        // update file content
        // await updateInvoiceSheet(duplicate, {
        //     sponsorName: "DarkLiquid",
        //     contactName: 'Jonathan James',
        //     dateCreated: '06/04/2025',
        //     addressLine1: 'Pentagon Centre',
        //     addressLine2: 'Glasgow, G3 8AZ',
        //     invoiceId: 'PO-0014452',
        //     invoiceNumber: 9,
        //     dueDate: '26/10/2025'
        // });


        // create foler with name month year
        // const newFolder = await createFolder(fileName)

        // move duplicate into folder
        // const movedFileId = await moveFileToFolder(duplicate, newFolder) as string;

        // await exportSheetToPDF(movedFileId);

        await sendEmail('ogunsolahabib@yahoo.com', "Test Invoice", 'Find your invoice attached', path.join(__dirname, process.env['SHEET_PDF_PATH']!))

        // return movedFileId


    } catch (err) {
        console.error('Error during folder copy:', err);
    }
}


