import fs from "fs";
import drive from "./drive.ts";


export default async function createFile(fileName: string, filePath: string, folderId: string) {
    const media = {
        mimeType: 'application/json', // Adjust based on file type
        body: fs.createReadStream(filePath),
    };

    try {
        // console.log(await authGoogle.getAccessToken());
        await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: 'application/json', // Adjust based on file type
                body: fs.createReadStream(filePath),
                parents: [folderId]
            },
            media: media
        }).then((response) => {
            console.log(response)
            return response
        });


    } catch (error: any) {
        console.error('Error uploading file:', error.message);
    }
}