import { Router } from 'express';
import client from '../db';
import getPutFields from '../utils/getPutFields';
import duplicateBaseInvoiceFile from '../utils/duplicateBaseInvoiceFile';
import drive from '../utils/drive';
import updateInvoiceSheet from '../utils/updateInvoiceSheet';
import createFolder from '../utils/createFolder';
import moveFileToFolder from '../utils/moveFileToFolder';
import exportSheetToPDF from '../utils/exportSheetToPdf';
import path from 'path'
import sendEmail from '../utils/sendEmail';
import { SHEET_PDF_PATH } from '../utils/constants';
import getFileName from '../utils/getFileName';


const router = Router();

router.get('/', (_, response) => {
    client.query('SELECT * FROM invoices JOIN sponsors ON invoices.sponsor_id = sponsors.sponsor_id', (err, res) => {
        const data = res.rows.map(row => {
            return {
                id: row.invoice_id,
                subject: row.subject,
                created_at: row.created_at,
                start_date: row.start_date,
                due_at: row.due_at,
                total_amount: row.total_amount,
                sponsor: {
                    sponsor_id: row.sponsor_id,
                    name: row.name
                }
            }
        })
        if (err) return response.send(err);
        response.send(data);
    });
});

// save invoice to db
router.post('/', (request, response) => {
    const { sponsor_id, total_amount, start_date, due_at, subject } = request.body;

    client.query(`INSERT INTO invoices(sponsor_id, subject, created_at, start_date, due_at, total_amount) VALUES ($1, $2, current_timestamp, $3, $4, $5) RETURNING *`,
        [sponsor_id, subject, start_date, due_at, total_amount],
        (err) => {
            if (err) return response.send(err);
            response.redirect('/invoices');
        });
});

// - create invoice file
router.post('/create-sheet', async () => {
    try {
        const duplicate = await duplicateBaseInvoiceFile();
        return duplicate;
    } catch (err) {
        throw err
    }

})


// - rename file
router.post('/rename-sheet', async (request) => {
    try {
        const { fileId, start_date, sponsorName } = request.body;

        await drive.files.update({
            fileId,
            requestBody: {
                name: getFileName(sponsorName, start_date)
            }
        });

    } catch (err) {
        throw err
    }

})

// fill invoice data
router.post('/fill-sheet', async (request) => {
    try {

        const { fileId, sponsorName,
            contactName,
            dateCreated,
            addressLine1,
            addressLine2,
            invoiceId,
            invoiceNumber,
            dueDate } = request.body


        await updateInvoiceSheet(fileId, {
            sponsorName,
            contactName,
            dateCreated,
            addressLine1,
            addressLine2,
            invoiceId,
            invoiceNumber,
            dueDate
        });

    } catch (err) {
        throw err
    }
});

// create folder
router.post('/create-folder/', async (request) => {
    try {
        const { sponsorName, month, year } = request.body;
        const fileName = `${year}-${month}-${sponsorName}-Invoice`;

        const newFolder = await createFolder(fileName);

        return newFolder;


    } catch (err) {
        throw err
    }
});

// move file to folder
router.post('/move-file/', async (request) => {
    try {
        const { fileId, folderId } = request.body;
        const movedFileId = await moveFileToFolder(fileId, folderId) as string;

        return movedFileId;

    } catch (err) {
        throw err
    }
});


// - Convert invoice to pdf
router.post('/sheet-to-pdf', async (request) => {
    try {
        const { fileId } = request.body;
        await exportSheetToPDF(fileId);

    } catch (err) {
        throw err
    }
})

// - Send pdf to email
router.post('/send-email', async (request) => {
    try {
        const { email_address, month, year, contactName, creatorName = "Keith" } = request.body;
        const subject = `Tech Meetup Glasgow Invoice for ${month}, ${year}`;

        const text = `Hi ${contactName},\nPlease find your Tech Meetup sponsor invoice attached.\nRegards,\n${creatorName}.`

        await sendEmail(email_address, subject, text, path.join(__dirname, SHEET_PDF_PATH!))

    } catch (err) {
        throw err
    }
})


router.put('/:id', (request, response) => {
    const { id } = request.params;

    const { setClause, fields, values } = getPutFields(request.body);

    try {
        client.query(`UPDATE invoices SET ${setClause} WHERE invoice_id = $${fields.length + 1}`, [...values, +id], (err, res) => {
            if (err) return response.send(err);

            if (res) {
                response.send(res.rows)
            }
        });

    } catch (err) {
        response.send(err)
    }
});



export default router;