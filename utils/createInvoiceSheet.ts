import createFolder from "./createFolder.ts";
import drive from "./drive.ts";
import duplicateBaseInvoiceFile from "./duplicateBaseInvoiceFile.ts";
import moveFileToFolder from "./moveFileToFolder.ts";

const testMonth = 'Dec';

const testYear = '1995';

const testName = 'DarkLiquid';


export default async function createInvoiceSheet() {

    const fileName = `${testYear}-${testMonth}-${testName}`
    try {

        // duplicate base file
        const duplicate = await duplicateBaseInvoiceFile();

        // rename duplicate file
        await drive.files.update({
            fileId: duplicate,
            requestBody: {
                name: fileName
            }
        })

        // create foler with name month year
        const newFolder = await createFolder(fileName)

        // move duplicate into folder
        await moveFileToFolder(duplicate, newFolder);


    } catch (err) {
        console.error('Error during folder copy:', err);
    }
}


