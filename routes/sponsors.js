const { Router } = require('express');
const pool = require('../db');
const getPutFields = require('../utils/getPutFields');

const router = Router();

router.get('/', (request, response) => {
    pool.query('SELECT * FROM sponsors', (err, res) => {
        if (err) return response.send(err);
        response.send(res.rows);
    });
});

router.post('/', (request, response) => {
    const { sponsor_id, total_amount } = request.body;

    pool.query('INSERT INTO sponsors(sponsor_id, invoice_date, total_amount) VALUES ($1, current_timestamp, $2)',
        [sponsor_id, total_amount],
        (err, res) => {
            if (err) return response.send(err);
            response.redirect('/sponsors');
        });
});

router.put('/:id', (request, response) => {
    const { id } = request.params;

    const { setClause, values } = getPutFields(request.body);

    try {
        pool.query(`UPDATE sponsors SET ${setClause} WHERE invoice_id = $2`, [...values, +id], (err, res) => {
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