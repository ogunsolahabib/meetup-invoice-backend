import { Router } from 'express';
import client from '../db';
import getPutFields from '../utils/getPutFields';

const router = Router();

router.get('/', (request, response) => {
    client.query('SELECT * FROM invoices JOIN sponsors ON invoices.sponsor_id = sponsors.sponsor_id', (err, res) => {
        const data = res.rows.map(row => {
            return {
                id: row.invoice_id,
                subject: row.subject,
                created_at: row.created_at,
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

router.post('/', (request, response) => {

    // duplicate base invoice file

    // update duplicate content with new data

    // convert file to pdf

    // send pdf to emails

    // save invoice to db
    const { sponsor_id, total_amount } = request.body;

    client.query(`INSERT INTO invoices(sponsor_id, subject, created_at, due_at, total_amount) VALUES ($1, $2, current_timestamp,now() + interval '2 week' $3) RETURNING *`,
        [sponsor_id, 'Invoice', total_amount],
        (err) => {
            if (err) return response.send(err);
            response.redirect('/invoices');
        });
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