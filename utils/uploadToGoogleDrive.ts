
import createFolder from "./createFolder.ts";
import createFile from "./createFile.ts";

async function uploadFileToDrive(fileName: string, filePath: string, folderName: string) {

    const folderId = await createFolder(folderName);

    const file = await createFile(fileName, filePath, folderId);

    return file

}


export default uploadFileToDrive;