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
import formatDate from '../utils/formatDate';


const router = Router({ mergeParams: true });

router.get('/', (_, response) => {
    try {

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
            if (err) return response.status(500).send(err);
            response.send(data);
        });
    } catch (err) {
        return response.status(500).send(err)
    }
});



// - create invoice file
router.post('/invoices/create-sheet', async (request, response) => {
    try {
        const duplicate = await duplicateBaseInvoiceFile();
        response.send({ data: duplicate });
    } catch (err) {
        throw err
    }
});


// - rename file
router.post('/rename-sheet', async (request, response) => {
    try {
        const { fileId, start_date, sponsorName } = request.body;

        await drive.files.update({
            fileId,
            requestBody: {
                name: getFileName(sponsorName, start_date)
            }
        });
        response.send({ data: 'success' });

    } catch (err) {
        throw err
    }

})

// fill invoice data
router.post('/fill-sheet', async (request, response) => {
    try {

        const { fileId, sponsor_name,
            contactName,
            addressLine1,
            addressLine2,
            dueDate } = request.body;

        const serverDate = await client.query("SELECT CURRENT_DATE");

        const invoicesCountObj = await client.query('SELECT COUNT(*) FROM invoices');


        const invoicesCount = invoicesCountObj.rows[0].count;

        await updateInvoiceSheet(fileId, {
            sponsor_name,
            contactName,
            dateCreated: formatDate(serverDate.rows[0].current_date),
            addressLine1,
            addressLine2,
            invoiceId: `PO-${invoicesCount + 1}`,
            invoiceNumber: +invoicesCount + 1,
            dueDate
        });


        response.send({ data: 'success' });

    } catch (err) {
        throw err
    }
});

// create folder
router.post('/create-folder/', async (request) => {
    try {
        const { sponsor_name, start_date } = request.body;

        const fileName = getFileName(sponsor_name, start_date);

        const newFolder = await createFolder(fileName);

        return newFolder;


    } catch (err) {
        throw err
    }
});

// move file to folder
router.post('/move-file/', async (request, response) => {
    try {
        const { fileId, folderId } = request.body;
        const movedFileId = await moveFileToFolder(fileId, folderId) as string;

        response.send({ data: movedFileId });

    } catch (err) {
        throw err
    }
});


// - Convert invoice to pdf
router.post('/sheet-to-pdf', async (request, response) => {
    try {
        const { fileId } = request.body;
        await exportSheetToPDF(fileId);


        response.send({ data: 'success' });

    } catch (err) {
        throw err
    }
})

// - Send pdf to email
router.post('/send-email', async (request, response) => {
    try {
        const { email_address, month, year, contactName, creatorName = "Keith" } = request.body;
        const subject = `Tech Meetup Glasgow Invoice for ${month}, ${year}`;

        const text = `Hi ${contactName},\nPlease find your Tech Meetup sponsor invoice attached.\nRegards,\n${creatorName}.`

        await sendEmail(email_address, subject, text, path.join(__dirname, SHEET_PDF_PATH!));


        response.send({ data: 'success' });

    } catch (err) {
        throw err
    }
})


// save invoice to db
router.post('/', (request, response) => {
    try {
        const { sponsor_id, total_amount, start_date, due_at, subject } = request.body;

        client.query(`INSERT INTO invoices(sponsor_id, subject, created_at, start_date, due_at, total_amount) VALUES ($1, $2, current_timestamp, $3, $4, $5) RETURNING *`,
            [sponsor_id, subject, start_date, due_at, total_amount],
            (err) => {
                if (err) return response.status(400).send(err);
                response.redirect('/invoices');
            });
    } catch (err) {
        response.status(400).send(err)
    }

});


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