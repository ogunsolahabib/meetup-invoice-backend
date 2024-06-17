import drive from "./drive.ts";

/**
 * Change the file's modification timestamp.
 * @param{string} fileId Id of the file to move
 * @param{string} folderId Id of the folder to move
 * @return{obj} file status
 * */
export default async function moveFileToFolder(fileId, folderId) {


    try {
        // Retrieve the existing parents to remove
        // return console.log({ fileId })
        const file = await drive.files.get({
            fileId: fileId,
            fields: 'parents',
        });

        // Move the file to the new folder
        const previousParents = file.data.parents
            ?.join(',');

        const files = await drive.files.update({
            fileId: fileId,
            addParents: folderId,
            removeParents: previousParents,
            fields: 'id',
        });

        return files.data.id;
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;

    }
}