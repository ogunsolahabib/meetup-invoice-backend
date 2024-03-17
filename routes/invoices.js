const { Router } = require('express');
const client = require('../db');
const getPutFields = require('../utils/getPutFields');

const router = Router();

router.get('/', (request, response) => {
    client.query('SELECT * FROM invoices JOIN sponsors ON invoices.sponsor_id = sponsors.sponsor_id', (err, res) => {
        const data = res.rows.map(row => {
            return {
                ...row,
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
    const { sponsor_id, total_amount } = request.body;

    client.query('INSERT INTO invoices(sponsor_id, invoice_date, total_amount) VALUES ($1, current_timestamp, $2)',
        [sponsor_id, total_amount],
        (err, res) => {
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



module.exports = router;