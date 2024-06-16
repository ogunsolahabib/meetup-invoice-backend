import drive from "./drive.ts";


export default async function createFolder(name: string) {
  const fileMetadata = {
    name: name,
    mimeType: 'application/vnd.google-apps.folder',
  };
  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
    console.log('Folder Id:', file?.data?.id);
    return file?.data.id;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}