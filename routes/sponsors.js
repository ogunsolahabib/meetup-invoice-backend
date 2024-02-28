const { Router } = require('express');
const pool = require('../db');
const getPutFields = require('../utils/getPutFields');

const router = Router();

router.get('/', (request, response) => {
    try {
        pool.query('SELECT * FROM sponsors', (err, data) => {
            if (err) return response.send(err);
            response.send(data.rows);
        });
    } catch (err) {
        response.send(err);
    }
});

router.post('/', (request, response) => {
    const { name, street, city, phone } = request.body;
    try {

        pool.query('INSERT INTO sponsors(name, street, city, phone) VALUES ($1, $2, $3, $4)',
            [name, street, city, phone],
            (err, data) => {
                if (err) return response.send(err);
                response.send('success');
            });
    } catch (err) {
        response.send(err);
    }
});

router.put('/:id', (request, response) => {
    const { id } = request.params;

    const { setClause, values } = getPutFields(request.body);

    try {
        pool.query(`UPDATE sponsors SET ${setClause} WHERE invoice_id = $2`, [...values, +id], (err, data) => {
            if (err) return response.send(err);
            if (data) {
                response.send(data.rows)
            }
        });

    } catch (err) {
        response.send(err)
    }
});

router.delete('/:id', (request, response) => {
    const { id } = request.params;
    try {
        pool.query('DELETE FROM sponsors WHERE id=$1', [+id], (err, data) => {
            response.send(data);
        })
    } catch (err) {
        response.send(err);
    }
});

module.exports = router;