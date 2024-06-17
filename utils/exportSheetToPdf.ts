import fs from 'fs';
import path from 'path';
import drive from './drive.ts';

const outputFilePath = process.env['SHEET_PDF_PATH']!

export default async function exportSheetToPDF(fileId: string) {
    const destination = fs.createWriteStream(path.join(__dirname, outputFilePath));
    const response = await drive.files.export(
        { fileId, mimeType: 'application/pdf' },
        { responseType: 'stream' }
    );
    response.data
        .on('end', () => {
            console.log('Done downloading document.');
        })
        .on('error', err => {
            console.error('Error downloading document.', err);
        })
        .pipe(destination);
}