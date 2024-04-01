const { Router } = require('express');
const client = require('../db');
const getPutFields = require('../utils/getPutFields');

const router = Router();

router.get('/', (request, response) => {
    try {
        client.query('SELECT * FROM sponsors', (err, data) => {
            if (err) return response.send(err);
            response.send(data.rows);
        });
    } catch (err) {
        response.send(err);
    }
});

router.get('/:id', (request, response) => {
    const { id } = request.params;
    try {
        client.query('SELECT s.*, c.name AS contact_name, c.email, c.phone  FROM sponsors s LEFT JOIN contacts c ON s.sponsor_id = c.sponsor_id WHERE s.sponsor_id = $1', [id], (err, data) => {
            if (err) return response.send(err);

            if (data.rows.length === 0) return response.status(404).send({});
            const res = {
                sponsor_id: data.rows[0].sponsor_id,
                name: data.rows[0].name,
                street: data.rows[0].street,
                city: data.rows[0].city,
                contacts: data.rows.map(row => {
                    return {
                        name: row.contact_name,
                        email: row.email,
                        phone: row.phone,
                        is_primary: row.is_primary
                    }
                })
            }
            response.send(res);
        })

    } catch (err) {
        response.send(err);
    }
})

router.post('/', (request, response) => {
    const { name, street, city } = request.body;
    try {
        client.query('INSERT INTO sponsors(name, street, city, date_created) VALUES ($1, $2, $3, $4, current_timestamp) RETURNING *',
            [name, street, city],
            (err, data) => {
                if (err) return response.send(err);
                response.send(data.rows);
            });
    } catch (err) {
        response.send(err);
    }
});

router.put('/:id', (request, response) => {
    const { id } = request.params;

    const { setClause, fields, values } = getPutFields(request.body);

    try {
        client.query(`UPDATE sponsors SET ${setClause} WHERE sponsor_id = $${fields.length + 1}`, [...values, +id], (err, data) => {
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
        client.query('DELETE FROM sponsors WHERE sponsor_id=$1', [+id], (err, data) => {
            response.send(data);
        })
    } catch (err) {
        response.send(err);
    }
});

router.post('/activate', (request, response) => {
    const { id, is_active } = request.body;
    try {
        client.query(`UPDATE sponsors SET is_active=$1 WHERE sponsor_id=$2`, [is_active, +id], (err, data) => {
            if (err) return response.send(err);
            if (data) {
                response.send(data.rows)
            }
        });

    } catch (err) {
        response.send(err)
    }
});

router.post('/add-contact', (request, response) => {
    const { sponsor_id, name, email, phone, is_primary } = request.body;

    try {
        client.query('INSERT INTO contacts(sponsor_id, name, email, phone, is_primary) VALUES ($1, $2, $3, $4, $5, $6)',
            [sponsor_id, contact_id, name, email, phone, is_primary],
            (err, data) => {
                if (err) return response.send(err);
                response.send('success');
            });
    } catch (err) {
        response.send(err);
    }

});

module.exports = router;