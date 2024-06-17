import createFolder from "./createFolder.ts";
import duplicateBaseInvoiceFile from "./duplicateBaseInvoiceFile.ts";
import moveFileToFolder from "./moveFileToFolder.ts";

const testMonth = 'Dec';

const testYear = '1995';

const testName = 'DarkLiquid';


export default async function createInvoiceSheet() {


    try {

        // 1. duplicate base file
        const duplicate = await duplicateBaseInvoiceFile();

        // 2. create foler with name month year
        const newFolder = await createFolder(`${testYear}-${testMonth}-${testName}`)

        // 3. move duplicate into folder
        await moveFileToFolder(duplicate, newFolder);


    } catch (err) {
        console.error('Error during folder copy:', err);
    }
}


